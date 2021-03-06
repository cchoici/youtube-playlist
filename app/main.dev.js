/* eslint global-require: 0, flowtype-errors/show-errors: 0 */

/**
 * This module executes inside of electron's main process. You can start
 * electron renderer process from here and communicate with the other processes
 * through IPC.
 *
 * When running `npm run build` or `npm run build-main`, this file is compiled to
 * `./app/main.prod.js` using webpack. This gives us some performance wins.
 *
 * @flow
 */
import electron from 'electron';
import Store from 'electron-store';
// import MenuBuilder from './menu';

const { app, ipcMain, BrowserWindow } = electron;

const store = new Store({
  name: 'ui',
  defaults: {
    winMode: 'NORMAL',
    windowBounds: {
      x: 0,
      y: 0,
      width: 900,
      height: 435,
    }
  }
});
// console.log('app:', app.getPath('userData'));
console.log(store.path);

let mainWindow = null;

if (process.env.NODE_ENV === 'production') {
  const sourceMapSupport = require('source-map-support');
  sourceMapSupport.install();
}

if (
  process.env.NODE_ENV === 'development' ||
  process.env.DEBUG_PROD === 'true'
) {
  require('electron-debug')();
  const path = require('path');
  const p = path.join(__dirname, '..', 'app', 'node_modules');
  require('module').globalPaths.push(p);
}

const installExtensions = async () => {
  const installer = require('electron-devtools-installer');
  const forceDownload = !!process.env.UPGRADE_EXTENSIONS;
  const extensions = ['REACT_DEVELOPER_TOOLS', 'REDUX_DEVTOOLS'];

  return Promise.all(
    extensions.map(name => installer.default(installer[name], forceDownload))
  ).catch(console.log);
};

/**
 * Add event listeners...
 */
ipcMain.on('player-mode', (evt, pos) => {
  mainWindow.setAlwaysOnTop(true);
  const x = pos[0] + 600;
  const y = pos[1];
  mainWindow.setVisibleOnAllWorkspaces(true);
  mainWindow.setPosition(x, y);
  mainWindow.setSize(300, 208, true);
});
ipcMain.on('normal-mode', (evt, pos) => {
  const electronScreen = electron.screen;
  const { width, height} = electronScreen.getPrimaryDisplay().workAreaSize;
  const x = pos[0] + 900 > width ? width - 900 : pos[0];
  const y = pos[1] + 435 > height ? height -435 : pos[1];
  mainWindow.setAlwaysOnTop(false);
  mainWindow.setVisibleOnAllWorkspaces(false);
  mainWindow.setPosition(x, y);
  mainWindow.setSize(900, 435, true);
});

app.on('window-all-closed', () => {
  // Respect the OSX convention of having the application in memory even
  // after all windows have been closed
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('ready', async () => {
  if (
    process.env.NODE_ENV === 'development' ||
    process.env.DEBUG_PROD === 'true'
  ) {
    await installExtensions();
  }
  const { x, y, width, height } = store.get('windowBounds');
  mainWindow = new BrowserWindow({
    x,
    y,
    width,
    height,
    resizable: false,
    maximizable: false,
    transparent: true,
    show: false,
    frame: false
  });

  mainWindow.loadURL(`file://${__dirname}/app.html`);

  // @TODO: Use 'ready-to-show' event
  //        https://github.com/electron/electron/blob/master/docs/api/browser-window.md#using-ready-to-show-event
  mainWindow.webContents.on('did-finish-load', () => {
    if (!mainWindow) {
      throw new Error('"mainWindow" is not defined');
    }
    mainWindow.show();
    mainWindow.focus();
  });

  mainWindow.on('close', () => {
    const { x: xS, y: yS, width: wS, height: hS } = mainWindow.getBounds();
    store.set('windowBounds', {
      x: xS,
      y: yS,
      width: wS,
      height: hS
    });
    mainWindow = null;
  });

  // const menuBuilder = new MenuBuilder(mainWindow);
  // menuBuilder.buildMenu();
});
