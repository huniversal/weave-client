import { contextBridge, ipcRenderer } from "electron";

const electronAPI = {
  getHealth: async () => {
    return ipcRenderer.invoke("app:health") as Promise<{
      appName: string;
      electronVersion: string;
      nodeVersion: string;
      platform: NodeJS.Platform;
    }>;
  }
};

contextBridge.exposeInMainWorld("electronAPI", electronAPI);
