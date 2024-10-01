import React from 'react';

const TaskSuggestions = ({ suggestions, onSelect }) => {
  return (
    <ul className="bg-white border rounded-md shadow-lg max-h-40 overflow-y-auto">
      {suggestions.map((suggestion, index) => (
        <li
          key={index}
          className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
          onClick={() => onSelect(suggestion)}
        >
          {suggestion}
        </li>
      ))}
    </ul>
  );
};

export default TaskSuggestions;