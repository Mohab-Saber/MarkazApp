export { };
const { contextBridge, ipcRenderer } = require('electron');
const fs = require('node:fs');
const os = require('node:os');

function getLocalIP(): string {
    const interfaces = os.networkInterfaces();
    for (const name of Object.keys(interfaces)) {
        const nets = interfaces[name];
        if (nets) {
            for (const net of nets) {
                // Skip over non-IPv4 and internal (i.e., 127.022.0.1) addresses
                if (net.family === 'IPv4' && !net.internal) {
                    if(net.address.slice(0,7) === '192.168'){

                        return net.address;
                    }
                }
            }
        }
    }
    return 'Unable to get IP'; // Default fallback
}
contextBridge.exposeInMainWorld('shared', {
    fs,
    getLocalIP,
    os
})
contextBridge.exposeInMainWorld('ipcRenderer', {
    send: (channel, data) => ipcRenderer.send(channel, data),
    on: (channel, func) => ipcRenderer.on(channel, (event, ...args) => func(...args)),
})
