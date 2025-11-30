import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../navigation/AppNavigator';

type Props = NativeStackScreenProps<RootStackParamList, 'Detail'>;

export default function DetailScreen({ route }: Props) {
  const { note } = route.params;
  const date = new Date(note.createdAt);
  const formatted = date.toLocaleString();

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.title}>{note.title}</Text>
      <Text style={styles.date}>{formatted}</Text>
      <View style={styles.bodyContainer}>
        <Text style={styles.body}>{note.content || 'No content for this note.'}</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#020617',
  },
  content: {
    padding: 16,
  },
  title: {
    color: '#F9FAFB',
    fontSize: 22,
    fontWeight: '700',
    marginBottom: 4,
  },
  date: {
    color: '#6B7280',
    fontSize: 12,
    marginBottom: 16,
  },
  bodyContainer: {
    backgroundColor: '#0B1120',
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: '#111827',
  },
  body: {
    color: '#E5E7EB',
    fontSize: 16,
    lineHeight: 22,
  },
});