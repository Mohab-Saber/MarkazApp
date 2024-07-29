export{};
const {contextBridge, ipcRenderer} = require('electron');
const fs = require('node:fs');

contextBridge.exposeInMainWorld('shared', {
fs
})
contextBridge.exposeInMainWorld('ipcRenderer', {
    send : (channel, data) => ipcRenderer.send(channel, data),
    on : (channel, func) => ipcRenderer.on(channel, (event, ...args) => func(...args)),
})
