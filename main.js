const electron = require('electron');
const { app, BrowserWindow } = electron;
const path = require('path');
const url = require('url');
require('child_process').fork('server.js'); 

let mainWin, traineeDataWin, trainerDataWin;

// 
function createMainWindow() {
    mainWin = new BrowserWindow({height: 700, width: 1100,title: 'مركز التدريب المهني', show:false,
        webPreferences: {
            contextIsolation: true,
            nodeIntegration: true,
            preload: path.join(__dirname, 'preload.js')
        }
    });

    mainWin.loadURL('http://localhost:3060/mainWin/index.html');
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
            preload: path.join(__dirname, 'views', 'traineeDataWin','preload.js')
        }
    });
    traineeDataWin.loadURL('http://localhost:3060/traineeDataWin/index.html')
    traineeDataWin.on('close', () => {traineeDataWin = null})
}

// Create a Window for Trainer Data
function createWindowTrainerData(){
    trainerDataWin = new BrowserWindow({height: 900, width: 1000, title:'بيانات المتدربين',
    parent:mainWin, modal:true,
        webPreferences: {
            contextIsolation: true,
            nodeIntegration: true,
            preload: path.join(__dirname, 'views', 'trainerDataWin', 'preload.js')
        }
    });
    trainerDataWin.loadURL('http://localhost:3060/trainerDataWin/index.html')
    trainerDataWin.on('close', () => {trainerDataWin = null})
}



// Start Main Window
app.whenReady().then( () => createMainWindow())

// Handles InterProcessCommunication
electron.ipcMain.on('closeMainWindow', (event, args)=>{
    mainWin.close()
})
electron.ipcMain.on('createWindowTraineeData', (event, args)=>{
    createWindowTraineeData()
    
    console.log("Starting Window for Trainee Data")
})
electron.ipcMain.on('createWindowTrainerData', (event, args)=>{
    createWindowTrainerData()
    
    console.log("Starting Window for Trainer Data")
})

// Handles InterProcessCommunication