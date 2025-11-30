# QuickNotes RN

QuickNotes RN is a minimal note-taking app built with **React Native**, **Expo**, and **TypeScript**.

The goal of this micro-project is to demonstrate a clean, modular architecture for a mobile app that:

- Uses React Navigation for screen-to-screen flow  
- Persists data locally with AsyncStorage  
- Separates UI, domain logic, and infrastructure concerns  
- Is small enough to understand quickly, but structured like a larger app

---

## Features

- Create a note with a **title** and **body**
- Persist notes locally using **AsyncStorage**
- View a list of existing notes on the **Home** screen
- Tap a note to open a **detail view**
- Long-press a note card to **delete** it
- Basic empty/loading states and simple, dark UI

---

## Tech Stack

- [Expo](https://expo.dev/) (React Native runtime)
- **React Native** (functional components + hooks)
- **TypeScript**
- **React Navigation** (`@react-navigation/native` + `@react-navigation/native-stack`)
- **AsyncStorage** (`@react-native-async-storage/async-storage`)
- `react-native-safe-area-context`, `react-native-screens`

---

## Project Structure

```text
src/
  components/
    NoteCard.tsx        # Reusable card for each note
  hooks/
    useNotes.ts         # Domain logic for loading/adding/deleting notes
  navigation/
    AppNavigator.tsx    # NavigationContainer + stack navigator
  screens/
    HomeScreen.tsx      # Create note + list of notes
    DetailScreen.tsx    # Single note view
  utils/
    storage.ts          # AsyncStorage read/write helpers
  types.ts              # Shared TypeScript types (e.g., Note)
App.tsx                 # App entry, SafeArea + navigator
