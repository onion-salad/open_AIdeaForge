import React, { useState } from 'react';
import { PlusCircle, X } from 'lucide-react';

const IdeaNote = () => {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState('');

  const addNote = () => {
    if (newNote.trim()) {
      setNotes([...notes, newNote.trim()]);
      setNewNote('');
    }
  };

  const removeNote = (index) => {
    setNotes(notes.filter((_, i) => i !== index));
  };

  return (
    <div className="bg-white shadow rounded-lg p-6">
      <h2 className="text-xl font-semibold mb-4">Idea Notes</h2>
      <div className="flex mb-4">
        <input
          type="text"
          value={newNote}
          onChange={(e) => setNewNote(e.target.value)}
          className="flex-grow border rounded-l px-4 py-2"
          placeholder="Add a new idea..."
        />
        <button
          onClick={addNote}
          className="bg-indigo-600 text-white px-4 py-2 rounded-r hover:bg-indigo-700"
        >
          <PlusCircle className="h-5 w-5" />
        </button>
      </div>
      <ul className="space-y-2">
        {notes.map((note, index) => (
          <li key={index} className="flex items-center justify-between bg-gray-100 p-2 rounded">
            <span>{note}</span>
            <button onClick={() => removeNote(index)} className="text-red-500 hover:text-red-700">
              <X className="h-4 w-4" />
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default IdeaNote;