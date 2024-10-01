import React from 'react';
import { useDrag } from 'react-dnd';

const DraggableService = ({ service }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'service',
    item: { id: service.id, name: service.name, url: service.url },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  return (
    <div
      ref={drag}
      className={`p-2 mb-2 bg-white rounded shadow cursor-move ${
        isDragging ? 'opacity-50' : ''
      }`}
    >
      {service.name}
    </div>
  );
};

export default DraggableService;