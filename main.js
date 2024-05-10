const electron = require('electron')
const { app, BrowserWindow } = electron
const path = require('path');
const url = require('url');

let mainWin, traineeDataWin;

// 
function createMainWindow() {
    mainWin = new BrowserWindow({height: 700, width: 1100,title: 'مركز التدريب المهني', show:false,
        webPreferences: {
            contextIsolation: true,
            nodeIntegration: true,
            preload: path.join(__dirname, 'preload.js')
        }
    });

    mainWin.loadURL(url.format({
        pathname: path.join(__dirname, 'views','mainWin','index.html'), 
        protocol: 'file',
        slashes: true
    }));
    mainWin.once('ready-to-show', () => mainWin.show())
    // Clean Code Shit
    mainWin.on('closed', () => {
        mainWin = null;
    })
}

// Create a Window for Trainee Data
function createWindowTraineeData(){
    traineeDataWin = new BrowserWindow({height: 900, width: 1000, title:'بيانات المتدربين',
    parent:mainWin, modal:true,
        webPreferences: {
            contextIsolation: true,
            nodeIntegration: true,
            preload: path.join(__dirname, 'preload1.js')
        }
    });
    traineeDataWin.loadURL(url.format({
        pathname: path.join(__dirname, 'views','traineeDataWin','traineeData.html'), 
        protocol: 'file',
        slashes: true
    }))
    traineeDataWin.on('close', () => {traineeDataWin = null})
}
// Start Main Window
app.whenReady().then( () => createMainWindow())

// Handles InterProcessCommunication
electron.ipcMain.on('createWindowTraineeData', (event, args)=>{
    createWindowTraineeData()
    
    console.log("Starting Window for TraineeData")
})
electron.ipcMain.on('closeMainWindow', (event, args)=>{
    mainWin.close()
})

// Handles InterProcessCommunication