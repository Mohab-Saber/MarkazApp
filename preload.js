const {contextBridge, ipcRenderer} = require('electron');
const dbFunctions = require('./model/dbFunctions');
const getAllFromTable = (tableName) => {
    return dbFunctions.getAllFromTable(tableName);
}
contextBridge.exposeInMainWorld('shared', {
    dbFunctions,
    getAllFromTable : getAllFromTable
})
contextBridge.exposeInMainWorld('ipcRenderer', {
    send : (channel, data) => ipcRenderer.send(channel, data),
    on : (channel, func) => ipcRenderer.on(channel, (event, ...args) => func(...args)),
})
