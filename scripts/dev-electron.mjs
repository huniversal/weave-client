import { spawn } from "node:child_process";
import { existsSync, readFileSync, statSync } from "node:fs";
import http from "node:http";
import path from "node:path";
import process from "node:process";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, "..");
const electronEntry = path.join(rootDir, ".electron-build", "main", "index.js");
const electronPackageDir = path.join(
  rootDir,
  "node_modules",
  ".pnpm",
  "electron@41.1.0",
  "node_modules",
  "electron"
);
const electronExecutable = readFileSync(
  path.join(electronPackageDir, "path.txt"),
  "utf8"
).trim();
const electronBin = path.join(electronPackageDir, "dist", electronExecutable);
const rendererUrl = "http://127.0.0.1:4173";

let electronProcess = null;
let isShuttingDown = false;
let restartTimer = null;
let isRendererReady = false;
let lastElectronBuildTimestamp = 0;
let isRestartingElectron = false;

const childProcesses = [];

const spawnProcess = (command, args, name, extraEnv = {}) => {
  const child = spawn(command, args, {
    cwd: rootDir,
    stdio: "inherit",
    env: {
      ...process.env,
      ...extraEnv
    }
  });

  child.on("exit", (code, signal) => {
    const isExpectedElectronRestart = name === "electron" && isRestartingElectron;

    if (isExpectedElectronRestart) {
      isRestartingElectron = false;
      return;
    }

    if (!isShuttingDown && code !== 0) {
      console.error(
        `[${name}] exited with code ${code ?? "null"}${signal != null ? `, signal ${signal}` : ""}.`
      );
      shutdown(code ?? 1);
    }
  });

  childProcesses.push(child);

  return child;
};

const wait = (duration) => {
  return new Promise((resolve) => {
    setTimeout(resolve, duration);
  });
};

const isServerReachable = async () => {
  return new Promise((resolve) => {
    const request = http.get(rendererUrl, (response) => {
      response.resume();
      resolve(true);
    });

    request.on("error", () => resolve(false));
    request.setTimeout(1000, () => {
      request.destroy();
      resolve(false);
    });
  });
};

const waitForRenderer = async () => {
  for (let attempt = 0; attempt < 60; attempt += 1) {
    const reachable = await isServerReachable();

    if (reachable) {
      isRendererReady = true;
      return true;
    }

    await wait(500);
  }

  return false;
};

const stopElectron = () => {
  if (electronProcess == null || electronProcess.killed) {
    return;
  }

  isRestartingElectron = true;
  electronProcess.kill("SIGTERM");
  electronProcess = null;
};

const startElectron = () => {
  if (!existsSync(electronEntry) || !isRendererReady) {
    return;
  }

  stopElectron();
  electronProcess = spawnProcess(electronBin, ["."], "electron", {
    VITE_DEV_SERVER_URL: rendererUrl
  });
};

const scheduleElectronRestart = () => {
  if (restartTimer != null) {
    clearTimeout(restartTimer);
  }

  restartTimer = setTimeout(() => {
    startElectron();
  }, 150);
};

const pollElectronBuild = () => {
  if (!existsSync(electronEntry)) {
    return;
  }

  const currentTimestamp = statSync(electronEntry).mtimeMs;

  if (currentTimestamp === lastElectronBuildTimestamp) {
    return;
  }

  lastElectronBuildTimestamp = currentTimestamp;
  scheduleElectronRestart();
};

const shutdown = (code = 0) => {
  if (isShuttingDown) {
    return;
  }

  isShuttingDown = true;

  stopElectron();

  for (const child of childProcesses) {
    if (!child.killed) {
      child.kill("SIGTERM");
    }
  }

  process.exit(code);
};

spawnProcess("pnpm", ["dev:renderer"], "renderer");
spawnProcess("pnpm", ["build:electron", "--watch", "--preserveWatchOutput"], "electron:tsc");

setInterval(pollElectronBuild, 500);

waitForRenderer()
  .then((ready) => {
    if (!ready) {
      console.error("[renderer] Vite dev server did not become reachable on time.");
      shutdown(1);
      return;
    }

    startElectron();
  })
  .catch((error) => {
    console.error("[renderer] Failed while waiting for Vite dev server.", error);
    shutdown(1);
  });

process.on("SIGINT", () => shutdown(0));
process.on("SIGTERM", () => shutdown(0));
