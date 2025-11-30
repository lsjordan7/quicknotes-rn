import { useEffect, useState, useCallback } from 'react';
import { Alert } from 'react-native';
import type { Note } from '../types';
import { loadNotes, saveNotes } from '../utils/storage';

const generateId = () => `${Date.now()}-${Math.random().toString(16).slice(2)}`;

export function useNotes() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const stored = await loadNotes();
      setNotes(stored);
      setLoading(false);
    })();
  }, []);

  const persist = useCallback(async (nextNotes: Note[]) => {
    setNotes(nextNotes);
    await saveNotes(nextNotes);
  }, []);

  const addNote = useCallback(
    async (title: string, content: string) => {
      if (!title.trim() && !content.trim()) {
        Alert.alert('Empty note', 'Please enter a title or some content.');
        return;
      }

      const newNote: Note = {
        id: generateId(),
        title: title.trim() || 'Untitled Note',
        content: content.trim(),
        createdAt: new Date().toISOString(),
      };

      const next = [newNote, ...notes];
      await persist(next);
    },
    [notes, persist]
  );

  const deleteNote = useCallback(
    async (id: string) => {
      const next = notes.filter(n => n.id !== id);
      await persist(next);
    },
    [notes, persist]
  );

  return { notes, loading, addNote, deleteNote };
}