const { app, BrowserWindow, ipcMain } = require('electron');

import path from 'node:path';
import os from 'node:os';
import fs from 'node:fs';

const pathToData = path.join( os.userInfo().homedir, 'AppData', 'local', 'Markaz','data.db');
if(!fs.existsSync(pathToData)){
  fs.writeFileSync(pathToData, '');
}
const DATABASE_URL = `DATABASE_URL="file:${pathToData}"`;
fs.writeFileSync('./.env', DATABASE_URL);


const {appServer : appserver} = require('./server');
appserver.listen(3060, () => {console.log('Server running on 3060')});

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) {
  app.quit();
}

const createWindow = () => {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      nodeIntegration:true,
      webSecurity: false
    },
  });

  // and load the index.html of the app.
  mainWindow.loadFile(path.join(__dirname, '..', 'views','index.html'));

  // Open the DevTools.
  // mainWindow.webContents.openDevTools();
};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  createWindow();

  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.

ipcMain.on('log', (event, args) => {
  console.log(args)
})

ipcMain.on('pdf', (event, args) => {
  console.log(args)
  
})
