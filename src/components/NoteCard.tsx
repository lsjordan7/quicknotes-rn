import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import type { Note } from '../types';

interface NoteCardProps {
  note: Note;
  onPress: () => void;
  onLongPress?: () => void;
  darkMode?: boolean;
}

export default function NoteCard({
  note,
  onPress,
  onLongPress,
  darkMode = false,
}: NoteCardProps) {
  const date = new Date(note.createdAt);
  const formatted = date.toLocaleString();
  const styles = darkMode ? darkStyles : lightStyles;

  return (
    <Pressable
      onPress={onPress}
      onLongPress={onLongPress}
      style={({ pressed }) => [
        styles.card,
        pressed && { opacity: 0.9, transform: [{ scale: 0.99 }] },
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

const baseCard = {
  borderRadius: 14,
  padding: 14,
  marginBottom: 14,
  borderWidth: 1,
  shadowColor: '#000',
  shadowOpacity: 0.04,
  shadowRadius: 3,
  shadowOffset: { width: 0, height: 1 },
};

const lightStyles = StyleSheet.create({
  card: {
    ...baseCard,
    backgroundColor: '#FFE68A',
    borderColor: '#E1C872',
  },
  title: {
    color: '#3F3201',
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 6,
  },
  preview: {
    color: '#5A4A0A',
    fontSize: 15,
    marginBottom: 10,
  },
  date: {
    color: '#8B7A3E',
    fontSize: 12,
    textAlign: 'right',
  },
});

const darkStyles = StyleSheet.create({
  card: {
    ...baseCard,
    backgroundColor: '#020617',
    borderColor: '#1F2937',
  },
  title: {
    color: '#F9FAFB',
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 6,
  },
  preview: {
    color: '#D1D5DB',
    fontSize: 15,
    marginBottom: 10,
  },
  date: {
    color: '#9CA3AF',
    fontSize: 12,
    textAlign: 'right',
  },
});