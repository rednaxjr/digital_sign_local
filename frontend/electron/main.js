const { app, BrowserWindow } = require('electron');
const path = require('path');
const url = require('url');
const fs = require('fs');

function createWindow() {
  const configPath = path.join(process.resourcesPath, 'config.json');
  let config = { apiUrl: configPath };

  if (fs.existsSync(configPath)) {
    config = JSON.parse(fs.readFileSync(configPath, 'utf-8'));
    console.log('Loaded config:', config);
  }

  const win = new BrowserWindow({
    width: 1280,
    height: 800,
    icon: path.join(__dirname, '../assets/icon.ico'),
    title: 'Digital Signature',
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: false,
      contextIsolation: true,
      additionalArguments: [`--config=${JSON.stringify(config)}`]
    }
  });

  win.loadURL(url.format({
    pathname: path.join(__dirname, '../dist/frontend/browser/index.html'),
    protocol: 'file:',
    slashes: true,
  }));

  win.webContents.on('before-input-event', (event, input) => {
    if (
      (input.key === 'r' && input.control) ||
      (input.key === 'F5')
    ) {
      event.preventDefault();
    }
  });

  if (!app.isPackaged) {
    win.webContents.openDevTools();
  }
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});