const { app, BrowserWindow, shell, ipcMain } = require('electron');
const path = require('path');

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) {
  app.quit();
}

function createWindow() {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    titleBarStyle: 'hiddenInset', // Mac-style seamless title bar
    webPreferences: {
      preload: path.join(__dirname, 'preload.cjs'),
      nodeIntegration: false,
      contextIsolation: true,
    },
    backgroundColor: '#000000',
    icon: path.join(__dirname, 'icon.png') // Ensure you have an icon if possible
  });

  // Load Messenger
  mainWindow.loadURL('https://www.messenger.com');

  // Inject Custom CSS for customization (Optional)
  mainWindow.webContents.on('did-finish-load', () => {
    // Example: Dark mode override if needed, though Messenger has native dark mode
    // mainWindow.webContents.insertCSS(`
    //   /* Custom Scrollbar */
    //   ::-webkit-scrollbar { width: 8px; }
    //   ::-webkit-scrollbar-track { background: #000; }
    //   ::-webkit-scrollbar-thumb { background: #333; border-radius: 4px; }
    // `);
  });

  // Handle external links - Open in default browser instead of Electron
  mainWindow.webContents.setWindowOpenHandler(({ url }) => {
    if (url.startsWith('https://www.messenger.com') || url.startsWith('https://messenger.com')) {
      return { action: 'allow' };
    }
    shell.openExternal(url);
    return { action: 'deny' };
  });
}

// This method will be called when Electron has finished initialization
app.whenReady().then(() => {
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

// Quit when all windows are closed, except on macOS.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});
