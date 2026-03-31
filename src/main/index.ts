import { app, BrowserWindow, ipcMain } from "electron";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const createMainWindow = async () => {
  const window = new BrowserWindow({
    width: 1440,
    height: 960,
    minWidth: 1200,
    minHeight: 760,
    backgroundColor: "#f4f7fb",
    title: "Weave Client",
    webPreferences: {
      preload: path.join(__dirname, "../preload/index.js"),
      contextIsolation: true,
      nodeIntegration: false
    }
  });

  const rendererUrl = process.env.VITE_DEV_SERVER_URL;

  if (rendererUrl != null && rendererUrl.length > 0) {
    await window.loadURL(rendererUrl);
    window.webContents.openDevTools({ mode: "detach" });
    return window;
  }

  await window.loadFile(path.join(__dirname, "../../dist/index.html"));

  return window;
};

const registerIpcHandlers = () => {
  ipcMain.handle("app:health", async () => {
    return {
      appName: app.getName(),
      electronVersion: process.versions.electron,
      nodeVersion: process.versions.node,
      platform: process.platform
    };
  });
};

const bootstrap = async () => {
  registerIpcHandlers();

  await app.whenReady();
  await createMainWindow();

  app.on("activate", async () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      await createMainWindow();
    }
  });
};

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

bootstrap().catch((error: unknown) => {
  console.error("Electron bootstrap failed.", error);
  app.quit();
});
