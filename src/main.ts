const { app, BrowserWindow, ipcMain } = require('electron');

import path from 'node:path';
import os from 'node:os';
import fs from 'node:fs';
import dotenv from 'dotenv';

const pathToDataDBFolder = path.join(os.userInfo().homedir, 'AppData', 'local', 'Markaz');
const pathToDataDB = path.join(pathToDataDBFolder, 'data.db');
const pathToDotEnv = path.join(pathToDataDBFolder, '.env');

if (!fs.existsSync(pathToDataDBFolder)) {
  fs.mkdirSync(pathToDataDBFolder, {recursive: true});
}
const DATABASE_URL = `DATABASE_URL="file:${pathToDataDB}"`;
// When packaging use this
fs.writeFileSync(pathToDotEnv, DATABASE_URL);
dotenv.config({path: pathToDotEnv})
// fs.writeFileSync('./.env', DATABASE_URL);


// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) {
  app.quit();
}

// Ensure single instance
const gotTheLock = app.requestSingleInstanceLock();

if (!gotTheLock) {
  app.quit();
} else {
  const { appServer: appserver } = require('./server');
  appserver.listen(3060, () => {
    console.log('Server running on 3060');
  });
  const createWindow = () => {
    // Create the browser window.
    const mainWindow = new BrowserWindow({
      width: 1200,
      height: 700,
      icon: './markazIcon.ico',
      darkTheme: true,
      webPreferences: {
        preload: path.join(__dirname, 'preload.js'),
        contextIsolation: true,
        nodeIntegration: true,
        webSecurity: false,
      },
      title: "مركز التنمية المهنية"
    });

    // and load the index.html of the app.
    mainWindow.loadURL(`http://localhost:3060/login`);

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

  // Listen for the 'second-instance' event to bring the main window to the front
  app.on('second-instance', () => {
    // Focus the main window if a second instance is attempted to be opened
    if (BrowserWindow.getAllWindows().length > 0) {
      const mainWindow = BrowserWindow.getAllWindows()[0];
      if (mainWindow.isMinimized()) mainWindow.restore();
      mainWindow.focus();
    }
  });

  // In this file you can include the rest of your app's specific main process
  // code. You can also put them in separate files and import them here.

  ipcMain.on('log', (event, args) => {
    console.log(args);
  });

  ipcMain.on('pdf', (event, args) => {
    require('child_process').exec(`explorer.exe "${path.join(os.userInfo().homedir, 'AppData', 'local', 'Markaz', 'PDF')}"`);
  });
}
