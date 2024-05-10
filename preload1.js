const {contextBridge, ipcRenderer} = require('electron');
const pg = require('pg');
const os = require('os');
const electron = require('electron');
const myBrowserWindow = electron.BrowserWindow; 
const path = require('path');
const url = require('url');
let data;

const client = new pg.Client({
    host: 'localhost',
    user: 'postgres',
    port: 5432,
    password: 'manga',
    database: 'MarkazDB'
})
client.connect()
client.query(`SELECT * FROM main`, (err, result) => {
    if(err){
        document.write(err)
        return null
    }
    data = result
    console.log(data)
    contextBridge.exposeInMainWorld('sharedData', data)
})


contextBridge.exposeInMainWorld('shared', {
    os:os,
    BrowserWindow: myBrowserWindow,
    path: path,
    pg:pg,
    
})
contextBridge.exposeInMainWorld('ipcRenderer', {
    send : (channel, data) => ipcRenderer.send(channel, data),
    on : (channel, func) => ipcRenderer.on(channel, (event, ...args) => func(...args)),
})
