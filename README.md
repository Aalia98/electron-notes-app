# Electron Notes App

A simple desktop notes app built with Electron and Node.js. Notes are saved locally on your computer, so they are still there when you reopen the app.

## Features

- Write a note and save it with one click
- Notes list showing the note number and date created
- Click a note in the list to view its content
- Notes stored in a local `notes.json` file in the app's user-data folder (no server or database)

## Tech

Electron 33, Node.js, HTML and JavaScript. The main process saves and loads notes over IPC, and the renderer handles the UI.

## Run locally

Requires Node.js and npm.

```
git clone https://github.com/Aalia98/electron-notes-app.git
cd electron-notes-app
npm install
npm start
```

## Limitations and next steps

- Notes cannot be edited or deleted yet
- No search and no tests
- The current Electron configuration (`nodeIntegration` enabled, `contextIsolation` disabled) is not production-hardened
