const { ipcRenderer } = require('electron');

const noteList = document.getElementById('note-list');
const noteContent = document.getElementById('note-content');
const saveButton = document.getElementById('save-note');
let notes = [];
let selectedNoteIndex = null;

// Load notes on startup
ipcRenderer.send('load-notes');

ipcRenderer.on('notes-loaded', (event, loadedNotes) => {
  notes = loadedNotes;
  renderNotesList();
});

// Save note
saveButton.addEventListener('click', () => {
  const content = noteContent.value.trim();
  if (!content) return;

  const note = { content, createdAt: new Date().toISOString() };
  notes.push(note);
  ipcRenderer.send('save-note', note);
});

ipcRenderer.on('note-saved', (event, updatedNotes) => {
  notes = updatedNotes;
  renderNotesList();
  noteContent.value = '';
});

// Render notes list
function renderNotesList() {
  noteList.innerHTML = '';
  notes.forEach((note, index) => {
    const listItem = document.createElement('li');
    listItem.textContent = `Note ${index + 1} - ${new Date(
      note.createdAt
    ).toLocaleDateString()}`;
    listItem.addEventListener('click', () => loadNoteContent(index));
    noteList.appendChild(listItem);
  });
}

// Load selected note content
function loadNoteContent(index) {
  selectedNoteIndex = index;
  noteContent.value = notes[index].content;
}
