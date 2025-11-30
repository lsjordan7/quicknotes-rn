import React, { useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  View,
  Button,
  Alert,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useNotes } from '../hooks/useNotes';
import NoteCard from '../components/NoteCard';
import type { RootStackParamList } from '../navigation/AppNavigator';

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;

export default function HomeScreen({ navigation }: Props) {
  const { notes, loading, addNote, deleteNote } = useNotes();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const onAdd = async () => {
    await addNote(title, content);
    setTitle('');
    setContent('');
  };

  const handleDelete = (id: string) => {
    Alert.alert('Delete note?', 'This cannot be undone.', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Delete',
        style: 'destructive',
        onPress: () => deleteNote(id),
      },
    ]);
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.select({ ios: 'padding', android: undefined })}
    >
      <View style={styles.inputContainer}>
        <Text style={styles.heading}>Create a Note</Text>
        <TextInput
          style={styles.input}
          placeholder="Title"
          placeholderTextColor="#6B7280"
          value={title}
          onChangeText={setTitle}
        />
        <TextInput
          style={[styles.input, styles.multiline]}
          placeholder="Write your note here..."
          placeholderTextColor="#6B7280"
          value={content}
          onChangeText={setContent}
          multiline
        />
        <Button title="Save Note" onPress={onAdd} />
      </View>

      <View style={styles.listContainer}>
        <Text style={styles.heading}>Your Notes</Text>
        {loading ? (
          <ActivityIndicator color="#FBBF24" />
        ) : notes.length === 0 ? (
          <Text style={styles.emptyText}>No notes yet. Start by creating one above.</Text>
        ) : (
          <FlatList
            data={notes}
            keyExtractor={item => item.id}
            renderItem={({ item }) => (
              <NoteCard
                note={item}
                onPress={() => navigation.navigate('Detail', { note: item })}
                onLongPress={() => handleDelete(item.id)}
              />
            )}
          />
        )}
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#020617',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  inputContainer: {
    backgroundColor: '#0B1120',
    borderRadius: 16,
    padding: 12,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#111827',
  },
  heading: {
    color: '#E5E7EB',
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#020617',
    color: '#F9FAFB',
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: '#1F2937',
    marginBottom: 8,
    fontSize: 14,
  },
  multiline: {
    minHeight: 70,
    textAlignVertical: 'top',
  },
  listContainer: {
    flex: 1,
  },
  emptyText: {
    color: '#6B7280',
    marginTop: 8,
  },
});