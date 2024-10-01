document.addEventListener('DOMContentLoaded', function() {
  const notesList = document.getElementById('notesList');
  const newNoteInput = document.getElementById('newNote');
  const addNoteButton = document.getElementById('addNote');

  function loadNotes() {
    chrome.storage.sync.get(['notes'], function(result) {
      const notes = result.notes || [];
      notesList.innerHTML = notes.map(note => `<div class="mt-2 p-2 bg-gray-100 rounded">${note}</div>`).join('');
    });
  }

  function addNote() {
    const newNote = newNoteInput.value.trim();
    if (newNote) {
      chrome.storage.sync.get(['notes'], function(result) {
        const notes = result.notes || [];
        notes.push(newNote);
        chrome.storage.sync.set({ notes: notes }, function() {
          loadNotes();
          newNoteInput.value = '';
        });
      });
    }
  }

  addNoteButton.addEventListener('click', addNote);
  loadNotes();
});