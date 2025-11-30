import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';
import DetailScreen from '../screens/DetailScreen';
import type { Note } from '../types';

export type RootStackParamList = {
  Home: undefined;
  Detail: { note: Note };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerStyle: { backgroundColor: '#111827' },
          headerTintColor: '#F9FAFB',
          contentStyle: { backgroundColor: '#020617' },
        }}
      >
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ title: 'QuickNotes' }}
        />
        <Stack.Screen
          name="Detail"
          component={DetailScreen}
          options={({ route }) => ({
            title: route.params.note.title || 'Note',
          })}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}