// Preload script
const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
  // Expose specific APIs if you need communication between renderer and main
  // setTitle: (title) => ipcRenderer.send('set-title', title)
});

window.addEventListener('DOMContentLoaded', () => {
  // DOM modifications if needed before load
});
