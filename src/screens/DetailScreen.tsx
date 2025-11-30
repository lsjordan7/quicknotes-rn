import React, { useLayoutEffect, useState } from 'react';
import {
  Button,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../navigation/AppNavigator';
import { useNotes } from '../hooks/useNotes';

type Props = NativeStackScreenProps<RootStackParamList, 'Detail'>;

export default function DetailScreen({ route, navigation }: Props) {
  const { note } = route.params;
  const { updateNote } = useNotes();

  const [title, setTitle] = useState(note.title);
  const [content, setContent] = useState(note.content);
  const [isEditing, setIsEditing] = useState(false);

  const date = new Date(note.createdAt);
  const formatted = date.toLocaleString();

  const handleSave = async () => {
    await updateNote(note.id, title, content);
    setIsEditing(false);

    navigation.setParams({
      note: { ...note, title, content },
    });

    navigation.setOptions({
      title: title || 'Note',
    });
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      title: note.title || 'Note',
    });
  }, [navigation, note.title]);

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      {isEditing ? (
        <>
          <TextInput
            style={styles.titleInput}
            value={title}
            onChangeText={setTitle}
            placeholder="Title"
          />
          <Text style={styles.date}>{formatted}</Text>
          <View style={styles.bodyContainer}>
            <TextInput
              style={styles.bodyInput}
              value={content}
              onChangeText={setContent}
              placeholder="Write your note..."
              multiline
            />
          </View>
          <View style={styles.buttonRow}>
            <Button title="Cancel" onPress={() => setIsEditing(false)} />
            <Button title="Save" onPress={handleSave} />
          </View>
        </>
      ) : (
        <>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.date}>{formatted}</Text>
          <View style={styles.bodyContainer}>
            <Text style={styles.body}>
              {content || 'No content for this note.'}
            </Text>
          </View>
          <View style={styles.buttonRow}>
            <Button title="Edit" onPress={() => setIsEditing(true)} />
          </View>
        </>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF6C2',
  },
  content: {
    padding: 16,
  },
  title: {
    color: '#3F3201',
    fontSize: 26,
    fontWeight: '700',
    marginBottom: 4,
  },
  titleInput: {
    color: '#3F3201',
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 4,
    borderBottomWidth: 1,
    borderBottomColor: '#E1C872',
    paddingVertical: 4,
  },
  date: {
    color: '#8B7A3E',
    fontSize: 13,
    marginBottom: 16,
  },
  bodyContainer: {
    backgroundColor: '#FFF9D9',
    borderRadius: 14,
    padding: 16,
    borderWidth: 1,
    borderColor: '#E1C872',
    marginBottom: 16,
  },
  body: {
    color: '#3F3201',
    fontSize: 16,
    lineHeight: 22,
  },
  bodyInput: {
    color: '#3F3201',
    fontSize: 16,
    lineHeight: 22,
    minHeight: 120,
    textAlignVertical: 'top',
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 12,
  },
});