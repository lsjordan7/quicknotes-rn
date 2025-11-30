import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from 'react';
import { Alert } from 'react-native';
import type { Note } from '../types';
import { loadNotes, saveNotes } from '../utils/storage';

const generateId = () =>
  `${Date.now()}-${Math.random().toString(16).slice(2)}`;

interface NotesContextValue {
  notes: Note[];
  loading: boolean;
  addNote: (title: string, content: string) => Promise<void>;
  deleteNote: (id: string) => Promise<void>;
  updateNote: (id: string, title: string, content: string) => Promise<void>;
}

const NotesContext = createContext<NotesContextValue | undefined>(undefined);

export function NotesProvider({ children }: { children: ReactNode }) {
  const [notes, setNotes] = useState<Note[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const stored = await loadNotes();
      setNotes(stored);
      setLoading(false);
    })();
  }, []);

  const persist = useCallback(async (next: Note[]) => {
    setNotes(next);
    await saveNotes(next);
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

  const updateNote = useCallback(
    async (id: string, title: string, content: string) => {
      const trimmedTitle = title.trim() || 'Untitled Note';
      const trimmedContent = content.trim();

      const next = notes.map(n =>
        n.id === id
          ? { ...n, title: trimmedTitle, content: trimmedContent }
          : n
      );
      await persist(next);
    },
    [notes, persist]
  );

  const value: NotesContextValue = {
    notes,
    loading,
    addNote,
    deleteNote,
    updateNote,
  };

  return (
    <NotesContext.Provider value={value}>{children}</NotesContext.Provider>
  );
}

export function useNotes() {
  const ctx = useContext(NotesContext);
  if (!ctx) {
    throw new Error('useNotes must be used within a NotesProvider');
  }
  return ctx;
}