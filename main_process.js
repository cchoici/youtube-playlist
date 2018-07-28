// Basic init
const electron = require('electron');

const { app, BrowserWindow } = electron;

// Let electron reloads by itself when webpack watches changes in ./app/
require('electron-reload')(__dirname);

// To avoid being garbage collected
let mainWindow;

app.on('ready', () => {
  mainWindow = new BrowserWindow({
    width: 310,
    height: 430,
    transparent: true,
    frame: false,
  });
  mainWindow.loadURL(`file://${__dirname}/app/index.html`);
  // mainWindow.webContents.openDevTools();
});
