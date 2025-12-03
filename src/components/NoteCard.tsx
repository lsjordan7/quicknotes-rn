import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import { Note } from '../types';

type Props = {
  note: Note;
  darkMode: boolean;
  onPress: () => void;
  onLongPress?: () => void;
  // New: called when the trashcan is tapped
  onDelete?: () => void;
};

const NoteCard: React.FC<Props> = ({
  note,
  darkMode,
  onPress,
  onLongPress,
  onDelete,
}) => {
  const backgroundColor = darkMode ? '#111827' : '#ffffff';
  const titleColor = darkMode ? '#F9FAFB' : '#111827';
  const bodyColor = darkMode ? '#9CA3AF' : '#4B5563';

  return (
    <View style={[styles.card, { backgroundColor }]}>
      {/* Main tappable area for opening the note */}
      <TouchableOpacity
        style={styles.cardContent}
        onPress={onPress}
        onLongPress={onLongPress}
        activeOpacity={0.85}
      >
        <Text
          style={[styles.title, { color: titleColor }]}
          numberOfLines={1}
        >
          {note.title || 'Untitled note'}
        </Text>
        <Text
          style={[styles.body, { color: bodyColor }]}
          numberOfLines={2}
        >
          {note.content}
        </Text>
      </TouchableOpacity>

      {/* Trashcan button on the right */}
      {onDelete && (
        <TouchableOpacity
          onPress={onDelete}
          style={styles.deleteButton}
          hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
        >
          <Feather name="trash-2" size={20} color="#DC2626" />
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 10,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  cardContent: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 2,
  },
  body: {
    fontSize: 14,
  },
  deleteButton: {
    marginLeft: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default NoteCard;