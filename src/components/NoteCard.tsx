import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import type { Note } from '../types';

interface NoteCardProps {
  note: Note;
  onPress: () => void;
  onLongPress?: () => void;
}

export default function NoteCard({ note, onPress, onLongPress }: NoteCardProps) {
  const date = new Date(note.createdAt);
  const formatted = date.toLocaleString();

  return (
    <Pressable
      onPress={onPress}
      onLongPress={onLongPress}
      style={({ pressed }) => [
        styles.card,
        pressed && { opacity: 0.8, transform: [{ scale: 0.99 }] },
      ]}
    >
      <View>
        <Text style={styles.title} numberOfLines={1}>
          {note.title}
        </Text>
        <Text style={styles.preview} numberOfLines={2}>
          {note.content || 'No content'}
        </Text>
      </View>
      <Text style={styles.date}>{formatted}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#020617',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#1F2937',
    padding: 12,
    marginBottom: 10,
  },
  title: {
    color: '#F9FAFB',
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  preview: {
    color: '#9CA3AF',
    fontSize: 14,
    marginBottom: 8,
  },
  date: {
    color: '#6B7280',
    fontSize: 12,
    textAlign: 'right',
  },
});