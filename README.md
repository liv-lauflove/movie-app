# 🎬 MovieFlix - React Practice Project

Welcome to **MovieFlix**, a beautiful and modern React application built as a practice project. It allows users to discover popular movies, search for specific titles, and save their favorite movies to a personal list.

This project was built by following the "Learn React With This ONE Project" tutorial, but significantly enhanced with a custom, premium cinematic UI and improved state management.

## ✨ Features

- **Live Movie Search:** Implemented a debounced search function that queries the TMDB API as you type.
- **Favorites Management:** A fully functional favorites system using React Context API and Local Storage. Favorites persist across page reloads.
- **Premium UI / UX:** 
  - Dark cinematic theme with glassmorphism effects.
  - Smooth hover animations and gradient highlights.
  - Custom Toast notifications instead of standard browser alerts.
- **Page Routing:** Seamless client-side routing using `react-router-dom`.
- **Dynamic Genres:** Automatically maps TMDB genre IDs to their corresponding readable genre badges on movie cards.

## 🚀 Tech Stack

- **Frontend:** React 19, Vite, React Router DOM
- **Styling:** Vanilla CSS (Custom modern variables, animations, and gradients)
- **Data Source:** [TMDB (The Movie Database) API](https://www.themoviedb.org/)

## 🛠️ Getting Started

### 1. Clone the repository
```bash
git clone https://github.com/liv-lauflove/movie-app.git
cd movie-app
```

### 2. Install dependencies
```bash
npm install
```

### 3. Setup TMDB API Key
1. Get a free API key from [TMDB](https://www.themoviedb.org/settings/api).
2. Open `src/services/api.js`.
3. Replace the `API_KEY` variable with your actual key.

### 4. Run the development server
```bash
npm run dev
```
Open your browser and navigate to the provided localhost URL.

## 📚 Learning Outcomes
Through this project, the following core React concepts were implemented and mastered:
- React Hooks (`useState`, `useEffect`)
- State management across multiple components using React Context API (`createContext`, `useContext`)
- Component architecture and reusability
- Making asynchronous API calls and handling loading/error states
- Form handling and debouncing
- Handling side-effects and Local Storage synchronization

---
*Happy Coding! 🍿*
