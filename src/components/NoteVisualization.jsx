import React from 'react';
import { ScatterChart, Scatter, XAxis, YAxis, ZAxis, Tooltip, ResponsiveContainer, ReferenceLine, Label } from 'recharts';
import { useSelectedServices } from '../context/SelectedServicesContext';

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="bg-white p-2 border rounded shadow">
        <p className="font-bold">{data.text}</p>
        <p>Tool: {data.tool}</p>
        <p>Importance: {data.important}</p>
        <p>Urgency: {data.urgent}</p>
      </div>
    );
  }
  return null;
};

const NoteVisualization = ({ notes }) => {
  const { addService } = useSelectedServices();

  return (
    <div className="h-[600px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
          <XAxis type="number" dataKey="important" name="Importance" unit="" domain={[0, 10]} />
          <YAxis type="number" dataKey="urgent" name="Urgency" unit="" domain={[0, 10]} />
          <ZAxis type="number" range={[100, 1000]} />
          <Tooltip content={<CustomTooltip />} />
          <ReferenceLine x={5} stroke="#666" strokeDasharray="3 3">
            <Label value="Important" position="insideTopRight" />
          </ReferenceLine>
          <ReferenceLine y={5} stroke="#666" strokeDasharray="3 3">
            <Label value="Urgent" position="insideBottomRight" />
          </ReferenceLine>
          <Scatter
            name="Notes"
            data={notes}
            fill="#8884d8"
          >
            {notes.map((entry, index) => (
              <cell key={`cell-${index}`} fill={`#${Math.floor(Math.random()*16777215).toString(16)}`} />
            ))}
          </Scatter>
        </ScatterChart>
      </ResponsiveContainer>
    </div>
  );
};

export default NoteVisualization;