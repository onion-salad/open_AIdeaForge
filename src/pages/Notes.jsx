import React, { useState } from 'react';
import Layout from '../components/Layout';
import { Button } from '@/components/ui/button';
import NoteVisualization from '../components/NoteVisualization';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { useTranslation } from 'react-i18next';
import { useMemos, useAddMemo, useDeleteMemo } from '../integrations/supabase';
import { Trash2 } from 'lucide-react';
import { useSelectedServices } from '../context/SelectedServicesContext';
import Notification from '../components/Notification';

const Notes = () => {
  const { t } = useTranslation();
  const [newNote, setNewNote] = useState({ text: '', tool: '', urgent: 10, important: 10 });
  const { data: memos, isLoading, error } = useMemos();
  const addMemoMutation = useAddMemo();
  const deleteMemoMutation = useDeleteMemo();
  const { notification } = useSelectedServices();

  const services = [
    'ChatGPT', 'Claude', 'GPT-Engineer', 'v0', 'Cosor', 'Dify', 'Supabase',
    'Google Cloud Console', 'Twitter', 'Facebook', 'LinkedIn', 'PR Times',
    'Product Hunt', 'Note'
  ];

  const addNote = async () => {
    if (newNote.text.trim()) {
      try {
        await addMemoMutation.mutateAsync({ memo: [newNote] });
        setNewNote({ text: '', tool: '', urgent: 10, important: 10 });
      } catch (error) {
        console.error('Failed to add memo:', error);
      }
    }
  };

  const deleteNote = async (id) => {
    try {
      await deleteMemoMutation.mutateAsync(id);
    } catch (error) {
      console.error('Failed to delete memo:', error);
    }
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  const sanitizeMemos = (memos) => {
    if (!Array.isArray(memos)) return [];
    return memos.map(memo => {
      if (!memo || !Array.isArray(memo.memo)) return null;
      return memo.memo.map(item => ({
        id: memo.id,
        text: item.text || '',
        tool: item.tool || '',
        urgent: item.urgent || 0,
        important: item.important || 0
      }));
    }).filter(Boolean).flat();
  };

  const sanitizedMemos = sanitizeMemos(memos);

  return (
    <Layout>
      <div className="max-w-6xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">{t('notes.title')}</h1>
        <Tabs defaultValue="matrix" className="w-full">
          <TabsList className="mb-4">
            <TabsTrigger value="matrix">{t('notes.timeManagementMatrix')}</TabsTrigger>
            <TabsTrigger value="list">{t('notes.listView')}</TabsTrigger>
          </TabsList>
          <TabsContent value="matrix">
            <NoteVisualization notes={sanitizedMemos} />
          </TabsContent>
          <TabsContent value="list">
            <div className="space-y-4">
              <div className="space-y-2">
                <Input
                  value={newNote.text}
                  onChange={(e) => setNewNote({...newNote, text: e.target.value})}
                  placeholder={t('notes.addNewNote')}
                  className="w-full"
                />
                <Select onValueChange={(value) => setNewNote({...newNote, tool: value})}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a tool" />
                  </SelectTrigger>
                  <SelectContent>
                    {services.map((service) => (
                      <SelectItem key={service} value={service}>{service}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <div>
                  <label>{t('notes.urgency')} ({newNote.urgent})</label>
                  <Slider
                    value={[newNote.urgent]}
                    onValueChange={(value) => setNewNote({...newNote, urgent: value[0]})}
                    max={20}
                    step={1}
                  />
                </div>
                <div>
                  <label>{t('notes.importance')} ({newNote.important})</label>
                  <Slider
                    value={[newNote.important]}
                    onValueChange={(value) => setNewNote({...newNote, important: value[0]})}
                    max={20}
                    step={1}
                  />
                </div>
                <Button onClick={addNote}>{t('notes.add')}</Button>
              </div>
              <ul className="space-y-2">
                {sanitizedMemos.map((note, index) => (
                  <li key={index} className="flex items-center justify-between space-x-2 bg-white p-4 rounded-lg shadow">
                    <div>
                      <p>{note.text}</p>
                      <p className="text-sm text-gray-500">Tool: {note.tool}</p>
                      <p className="text-sm text-gray-500">Urgency: {note.urgent}, Importance: {note.important}</p>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => deleteNote(note.id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </li>
                ))}
              </ul>
            </div>
          </TabsContent>
        </Tabs>
      </div>
      {notification && <Notification message={notification} />}
    </Layout>
  );
};

export default Notes;