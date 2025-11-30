import AsyncStorage from '@react-native-async-storage/async-storage';
import type { Note } from '../types';

const NOTES_KEY = 'QUICKNOTES_NOTES_V1';

export async function loadNotes(): Promise<Note[]> {
  try {
    const json = await AsyncStorage.getItem(NOTES_KEY);
    if (!json) return [];
    return JSON.parse(json) as Note[];
  } catch (error) {
    console.error('Error loading notes', error);
    return [];
  }
}

export async function saveNotes(notes: Note[]): Promise<void> {
  try {
    const json = JSON.stringify(notes);
    await AsyncStorage.setItem(NOTES_KEY, json);
  } catch (error) {
    console.error('Error saving notes', error);
  }
}