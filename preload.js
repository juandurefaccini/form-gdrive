const { contextBridge, ipcRenderer } = require('electron');


contextBridge.exposeInMainWorld('ipcRenderer', {
    send: (channel, data) => ipcRenderer.send(channel, data)
})


ipcRenderer.on('asynchronous-response', (_event, arg) => {
    alert(arg) 
})


ipcRenderer.on('asynchronous-error', (_event, arg) => {
    alert(arg.message) 
})


