const {contextBridge, ipcRenderer} = require('electron');
const pg = require('pg');
const os = require('os');
const electron = require('electron');
const myBrowserWindow = electron.BrowserWindow; 
const path = require('path');
const url = require('url');
const client = new pg.Client

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
