const electron = require('electron');
const Store = require('electron-store');

const { app, BrowserWindow } = electron;
const store = new Store({
  name: 'ui',
  defaults: {
    windowBounds: {
      x: 0,
      y: 0,
      width: 900,
      height: 600,
    },
  },
});


// Let electron reloads by itself when webpack watches changes in ./app/
require('electron-reload')(__dirname);

// To avoid being garbage collected
let mainWindow;

app.on('ready', () => {
  {
    const {
      x,
      y,
      width,
      height,
    } = store.get('windowBounds');
    mainWindow = new BrowserWindow({
      x,
      y,
      width: 925,
      height: 430,
      transparent: true,
      frame: false,
    });
  }
  mainWindow.loadURL(`file://${__dirname}/app/index.html`);
  mainWindow.on('close', () => {
    const {
      x,
      y,
      width,
      height,
    } = mainWindow.getBounds();
    store.set('windowBounds', {
      x,
      y,
      width,
      height,
    });
    mainWindow = null;
  });
  mainWindow.openDevTools({ detech: true });
});
