/// <reference types="vite/client" />

interface ElectronHealth {
  appName: string;
  electronVersion: string;
  nodeVersion: string;
  platform: NodeJS.Platform | "browser";
}

interface Window {
  electronAPI?: {
    getHealth: () => Promise<ElectronHealth>;
  };
}
