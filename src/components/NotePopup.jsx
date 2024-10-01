import React, { useState, useEffect, useRef } from 'react';
import { X } from 'lucide-react';
import { useAddMemo } from '../integrations/supabase';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";

const services = [
  'ChatGPT', 'Claude', 'GPT-Engineer', 'v0', 'Cosor', 'Dify', 'Supabase',
  'Google Cloud Console', 'Twitter', 'Facebook', 'LinkedIn', 'PR Times',
  'Product Hunt', 'Note'
];

const NotePopup = ({ onClose }) => {
  const [note, setNote] = useState('');
  const [tool, setTool] = useState('');
  const [urgent, setUrgent] = useState(5);
  const [important, setImportant] = useState(5);
  const textareaRef = useRef(null);
  const addMemoMutation = useAddMemo();

  useEffect(() => {
    textareaRef.current.focus();
  }, []);

  const handleSave = async () => {
    if (note.trim()) {
      try {
        await addMemoMutation.mutateAsync({ 
          memo: [{ 
            text: note.trim(),
            tool,
            urgent,
            important
          }] 
        });
        onClose();
      } catch (error) {
        console.error('Failed to add memo:', error);
      }
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-96">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">クイックメモ</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X className="h-5 w-5" />
          </button>
        </div>
        <textarea
          ref={textareaRef}
          value={note}
          onChange={(e) => setNote(e.target.value)}
          className="w-full h-40 p-2 border rounded-md mb-4"
          placeholder="メモを入力してください..."
        />
        <Select onValueChange={setTool} value={tool}>
          <SelectTrigger className="w-full mb-4">
            <SelectValue placeholder="ツールを選択" />
          </SelectTrigger>
          <SelectContent>
            {services.map((service) => (
              <SelectItem key={service} value={service}>{service}</SelectItem>
            ))}
          </SelectContent>
        </Select>
        <div className="mb-4">
          <label className="block mb-2">緊急度: {urgent}</label>
          <Slider
            value={[urgent]}
            onValueChange={(value) => setUrgent(value[0])}
            max={10}
            step={1}
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2">重要度: {important}</label>
          <Slider
            value={[important]}
            onValueChange={(value) => setImportant(value[0])}
            max={10}
            step={1}
          />
        </div>
        <div className="flex justify-end">
          <button
            onClick={handleSave}
            className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
          >
            メモを保存
          </button>
        </div>
      </div>
    </div>
  );
};

export default NotePopup;