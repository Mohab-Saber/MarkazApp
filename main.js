const electron = require('electron');
const { app, BrowserWindow } = electron;
const path = require('path');
const url = require('url');

// Starts a server in the backend
// const server = require('child-process').fork('server.js')


let mainWin;

// 
function createMainWindow() {
    mainWin = new BrowserWindow({
        height: 700, width: 1100, title: 'مركز التدريب المهني', show: false,
        webPreferences: {
            contextIsolation: true,
            nodeIntegration: true,
            preload: path.join(__dirname, 'preload.js')
        }
    });


    mainWin.loadFile(path.join(__dirname, 'views', 'index.html'));
    mainWin.once('ready-to-show', () => mainWin.show())
    // Clean Code Shit
    mainWin.on('closed', () => {
        mainWin = null;
    })
}

// Start Main Window
app.whenReady().then(() => {createMainWindow(); mainWin.webContents.openDevTools();})

// Handles InterProcessCommunication
electron.ipcMain.on('closeMainWindow', (event, args) => {
    mainWin.close()
})