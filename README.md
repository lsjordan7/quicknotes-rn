# 📘 QuickNotes  
### A Lightweight, Fast, Themed Note-Taking App (React Native + Expo)

QuickNotes is a clean, modern note-taking app built with **React Native**, **Expo**, and **TypeScript**.  
It demonstrates real mobile-engineering thinking: modular architecture, polished UI, persistent storage, theming, and strong component structure.

This project was built as a showcase of:

- Mobile UI/UX design intuition  
- Clean architectural patterns  
- Context-based state management  
- Async storage and offline persistence  
- Smooth navigation flows  
- Theming (light + dark)  
- Practical React Native app structure  

---

## 🚀 Features

### ✔ Create Notes  
Add quick notes with title + body.

### ✔ Edit Notes  
Tap any note → instantly edit + save.

### ✔ Persistent Storage  
Notes are saved using **Async Storage** and remain after closing the app.

### ✔ Light / Dark Theme Toggle  
Demonstrates scalable theme tokens and component refactoring.

### ✔ Floating Action Button (FAB)  
A modern UX pattern for primary actions.

### ✔ Smooth, Polished UI  
- Rounded cards  
- Shadows  
- Spacing system  
- Elegant typography  
- Subtle animations  

### ✔ Navigation Stack  
Built with **React Navigation** for clean screen transitions.

---

## 📸 Screenshots

> *(Replace the placeholder paths below with real screenshots once ready.)*

| Home – Light Mode | Home – Dark Mode | Note Detail |
|-------------------|------------------|-------------|
| ![](screenshots/home-light.png) | ![](screenshots/home-dark.png) | ![](screenshots/detail.png) |

---

## 🧱 Architecture Overview

QuickNotes is structured with clarity and scalability in mind.

### **`src/hooks/useNotes.tsx`**  
A centralized logic layer:

- React Context provides note state globally  
- Custom hook exposes add/edit/delete APIs  
- Async Storage persistence  
- Clean, predictable interface for UI components  

### **`src/screens/` Folder**  
Each screen handles presentation only:

**`HomeScreen.tsx`**  
- Lists notes  
- FAB for new note  
- Theming toggle  
- Animated transitions  

**`DetailScreen.tsx`**  
- Edit a note  
- Validation  
- Clean reading/editing experience  

### **`src/components/NoteCard.tsx`**  
Reusable, theme-aware preview card:

- Pressable  
- Soft shadows  
- Truncated text  
- Uses global theme tokens  

### **`App.tsx`**  
The root of the application:

- Navigation container  
- Safe area wrappers  
- NotesProvider  
- Light/Dark theme logic  

---

## 🧩 Tech Stack

- **React Native**  
- **Expo**  
- **TypeScript**  
- **React Navigation**  
- **Async Storage**  
- **Context API**  
- **Custom Hooks**  

---

## 🎨 Design Decisions

QuickNotes embraces a **digital notepad aesthetic**:

- Warm, soft yellow primary color  
- Rounded corners everywhere  
- Gentle shadows  
- Large tap targets  
- Legible typography  
- Minimal clutter  

The app is intentionally:

- Calm  
- Fast  
- Focused  
- Intuitive  

It’s designed to feel like a **thoughtful everyday tool**, not a demo.

---

## 📦 Setup & Installation

Clone the repo:

```bash
git clone https://github.com/lsjordan7/quicknotes-rn.git
cd quicknotes-rn
```
Install dependencies:
```bash
npm install
```

Start the Expo development server:
```bash
npx expo start
```
Run the project on:
	•	iOS Simulator
	•	Android Emulator
	•	Expo Go on mobile
	•	Web

## 🌱 Future Enhancements

Potential upgrades (excellent talking points):
	•	Cloud sync
	•	Swipe-to-delete
	•	Search and filtering
	•	Categories / folders
	•	Multi-device sync
	•	Pinning favorite notes
	•	Biometrics (Face ID / Touch ID) lock

⸻

## 🗣 Why This Project Matters

QuickNotes demonstrates:
	•	Ability to build real mobile UI/UX
	•	Understanding of component architecture
	•	State management patterns
	•	Navigation strategies
	•	Theme systems
	•	Async persistence
	•	Git, debugging, and iteration
	•	Speed of learning and execution
	•	“Product thinking” combined with engineering skill

This project shows that I can think like a developer and a designer — shipping something clean, maintainable, and user-friendly.

⸻

📬 Contact

Feel free to reach out if you’d like to discuss this project or my approach.
	
