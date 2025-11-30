import React, { useEffect, useMemo, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  KeyboardAvoidingView,
  LayoutAnimation,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  UIManager,
  View,
  Alert,
  TouchableOpacity,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useNotes } from '../hooks/useNotes';
import NoteCard from '../components/NoteCard';
import type { RootStackParamList } from '../navigation/AppNavigator';

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;

type Theme = {
  background: string;
  panel: string;
  panelBorder: string;
  inputBg: string;
  inputBorder: string;
  heading: string;
  textSubtle: string;
  accent: string;
};

const lightTheme: Theme = {
  background: '#FFF6C2',
  panel: '#FFF9D9',
  panelBorder: '#E1C872',
  inputBg: '#FFF6C2',
  inputBorder: '#E1C872',
  heading: '#5A4A0A',
  textSubtle: '#8B7A3E',
  accent: '#FFCB2B',
};

const darkTheme: Theme = {
  background: '#020617',
  panel: '#0B1120',
  panelBorder: '#111827',
  inputBg: '#020617',
  inputBorder: '#1F2937',
  heading: '#E5E7EB',
  textSubtle: '#6B7280',
  accent: '#FBBF24',
};

if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

export default function HomeScreen({ navigation }: Props) {
  const { notes, loading, addNote, deleteNote } = useNotes();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [darkMode, setDarkMode] = useState(false);

  const theme = darkMode ? darkTheme : lightTheme;
  const styles = useMemo(() => createStyles(theme), [theme]);

  useEffect(() => {
    navigation.setOptions({
      title: 'QuickNotes',
    });
  }, [navigation]);

  const onAdd = async () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
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
        onPress: () => {
          LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
          deleteNote(id);
        },
      },
    ]);
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.select({ ios: 'padding', android: undefined })}
    >
      <View style={styles.headerRow}>
        <Text style={styles.heading}>Create a Note</Text>
        <TouchableOpacity
          style={styles.themeToggle}
          onPress={() => setDarkMode(m => !m)}
        >
          <Text style={styles.themeToggleText}>
            {darkMode ? 'Light' : 'Dark'}
          </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Title"
          placeholderTextColor={theme.textSubtle}
          value={title}
          onChangeText={setTitle}
        />
        <TextInput
          style={[styles.input, styles.multiline]}
          placeholder="Write your note here..."
          placeholderTextColor={theme.textSubtle}
          value={content}
          onChangeText={setContent}
          multiline
        />
      </View>

      <View style={styles.listContainer}>
        <Text style={styles.heading}>Your Notes</Text>
        {loading ? (
          <ActivityIndicator color={theme.accent} />
        ) : notes.length === 0 ? (
          <Text style={styles.emptyText}>
            No notes yet. Start by creating one above.
          </Text>
        ) : (
          <FlatList
            data={notes}
            keyExtractor={item => item.id}
            renderItem={({ item }) => (
              <NoteCard
                note={item}
                darkMode={darkMode}
                onPress={() => navigation.navigate('Detail', { note: item })}
                onLongPress={() => handleDelete(item.id)}
              />
            )}
            contentContainerStyle={styles.listContent}
          />
        )}
      </View>

      <TouchableOpacity style={styles.fab} onPress={onAdd}>
        <Text style={styles.fabText}>＋</Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
}

const createStyles = (theme: Theme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.background,
      paddingHorizontal: 16,
      paddingVertical: 12,
    },
    headerRow: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginBottom: 8,
    },
    heading: {
      color: theme.heading,
      fontSize: 20,
      fontWeight: '700',
    },
    themeToggle: {
      paddingHorizontal: 10,
      paddingVertical: 6,
      borderRadius: 999,
      borderWidth: 1,
      borderColor: theme.panelBorder,
      backgroundColor: theme.panel,
    },
    themeToggleText: {
      color: theme.heading,
      fontSize: 12,
      fontWeight: '600',
    },
    inputContainer: {
      backgroundColor: theme.panel,
      borderRadius: 14,
      padding: 12,
      marginBottom: 16,
      borderWidth: 1,
      borderColor: theme.panelBorder,
      shadowColor: '#000',
      shadowOpacity: 0.05,
      shadowRadius: 4,
      shadowOffset: { width: 0, height: 2 },
    },
    input: {
      backgroundColor: theme.inputBg,
      color: theme.heading,
      borderRadius: 10,
      paddingHorizontal: 12,
      paddingVertical: 10,
      borderWidth: 1,
      borderColor: theme.inputBorder,
      marginBottom: 10,
      fontSize: 16,
    },
    multiline: {
      minHeight: 80,
      textAlignVertical: 'top',
    },
    listContainer: {
      flex: 1,
    },
    listContent: {
      paddingBottom: 80,
    },
    emptyText: {
      color: theme.textSubtle,
      marginTop: 12,
    },
    fab: {
      position: 'absolute',
      right: 20,
      bottom: 24,
      width: 56,
      height: 56,
      borderRadius: 28,
      backgroundColor: theme.accent,
      alignItems: 'center',
      justifyContent: 'center',
      shadowColor: '#000',
      shadowOpacity: 0.25,
      shadowRadius: 6,
      shadowOffset: { width: 0, height: 4 },
      elevation: 4,
    },
    fabText: {
      color: '#1F2933',
      fontSize: 32,
      lineHeight: 32,
      fontWeight: '700',
    },
  });