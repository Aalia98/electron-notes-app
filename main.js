const { app, BrowserWindow, ipcMain } = require('electron');
const fs = require('fs');
const path = require('path');

let mainWindow;
const dataFilePath = path.join(app.getPath('userData'), 'notes.json');

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    },
  });

  mainWindow.loadFile('index.html');
  mainWindow.on('closed', () => (mainWindow = null));
}

app.on('ready', createWindow);
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});
app.on('activate', () => {
  if (mainWindow === null) createWindow();
});

// Handle saving notes
ipcMain.on('save-note', (event, note) => {
  let notes = [];
  if (fs.existsSync(dataFilePath)) {
    notes = JSON.parse(fs.readFileSync(dataFilePath));
  }
  notes.push(note);
  fs.writeFileSync(dataFilePath, JSON.stringify(notes));
  event.reply('note-saved', notes);
});

// Handle loading notes
ipcMain.on('load-notes', (event) => {
  if (fs.existsSync(dataFilePath)) {
    const notes = JSON.parse(fs.readFileSync(dataFilePath));
    event.reply('notes-loaded', notes);
  } else {
    event.reply('notes-loaded', []);
  }
});
