/// <reference types="vite/client" />

interface ElectronHealth {
  appName: string;
  electronVersion: string;
  nodeVersion: string;
  platform: NodeJS.Platform;
}

interface Window {
  electronAPI: {
    getHealth: () => Promise<ElectronHealth>;
  };
}
