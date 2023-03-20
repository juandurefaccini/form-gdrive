const { app, BrowserWindow } = require('electron');
const path = require('path');
const { ipcMain } = require('electron/main');

const upload  = require("./app/src/node/service/upload");

let mainWindow;

function createMainWindow() {
  mainWindow = new BrowserWindow({
    title: 'form-gdrive',
    width: 1500,
    height: 800,
    webPreferences: {
      contextIsolation: true,
      nodeIntegration: true,
      preload: path.join(__dirname, 'preload.js'),
    },
  });

  mainWindow.webContents.openDevTools();

  mainWindow.loadURL('http://localhost:3000');
}

app.whenReady().then(createMainWindow);


ipcMain.on('file:upload', (event, opt) => {

    upload.uploadFile(opt.file, opt.scope).then(
        (response) => event.reply('asynchronous-response', response)
    ).catch(
        (error) => event.reply('asynchronous-error', error)
    ) 
})