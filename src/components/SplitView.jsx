import React, { useState } from 'react';
import { Resizable } from 're-resizable';

const SplitView = ({ children, externalUrl }) => {
  const [width, setWidth] = useState('50%');

  return (
    <div className="flex h-screen overflow-hidden">
      <Resizable
        size={{ width, height: '100%' }}
        onResizeStop={(e, direction, ref, d) => {
          setWidth(ref.style.width);
        }}
        minWidth="30%"
        maxWidth="70%"
        enable={{ right: true }}
      >
        <div className="h-full overflow-auto bg-white shadow-md">{children}</div>
      </Resizable>
      {externalUrl && (
        <div className="flex-1 h-full">
          <iframe src={externalUrl} className="w-full h-full border-none" title="External Content" />
        </div>
      )}
    </div>
  );
};

export default SplitView;