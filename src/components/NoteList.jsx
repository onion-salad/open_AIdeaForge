import React from 'react';

const NoteList = () => {
  // This is a placeholder for the actual data that would come from Supabase
  const notes = [
    { id: 1, content: 'Note 1', createdAt: '2023-04-01T12:00:00Z' },
    { id: 2, content: 'Note 2', createdAt: '2023-04-02T14:30:00Z' },
    { id: 3, content: 'Note 3', createdAt: '2023-04-03T09:15:00Z' },
    // Add more notes as needed
  ];

  return (
    <div className="space-y-4">
      {notes.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).map((note) => (
        <div key={note.id} className="bg-white shadow rounded-lg p-4">
          <p>{note.content}</p>
          <p className="text-sm text-gray-500 mt-2">
            Created on: {new Date(note.createdAt).toLocaleString()}
          </p>
        </div>
      ))}
    </div>
  );
};

export default NoteList;