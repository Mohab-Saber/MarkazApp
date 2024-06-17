const {contextBridge, ipcRenderer} = require('electron');
const dbTraineeFunctions = require('./model/dbTraineesFuncs');
const dbTrainerFunctions = require('./model/dbTrainersFuncs');
const dbAdministrationsFunctions = require('./model/dbAdministrationsFuncs');
const dbSchoolsFunctions = require('./model/dbSchoolFuncs');


contextBridge.exposeInMainWorld('shared', {
    dbTraineeFunctions,
    dbTrainerFunctions,
    dbAdministrationsFunctions,
    dbSchoolsFunctions,
    
})
contextBridge.exposeInMainWorld('ipcRenderer', {
    send : (channel, data) => ipcRenderer.send(channel, data),
    on : (channel, func) => ipcRenderer.on(channel, (event, ...args) => func(...args)),
})
