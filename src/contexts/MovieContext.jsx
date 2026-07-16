import {createContext, useState, useContext, useEffect} from 'react';

const MovieContext = createContext();
export const useMovieContext = () => useContext(MovieContext);

export const MovieProvider = ({children}) => {
    // Initialize state directly from localStorage so it doesn't get overwritten on first render
    const [favorites, setFavorites] = useState(() => {
        const storedFavs = localStorage.getItem('favorites');
        return storedFavs ? JSON.parse(storedFavs) : [];
    });
    
    const [searchQuery, setSearchQuery] = useState("");
    const [toastMessage, setToastMessage] = useState(null);

    // Only one useEffect needed to save changes to localStorage
    useEffect(() => {
        localStorage.setItem('favorites', JSON.stringify(favorites));
    }, [favorites]);

    const addFavorite = (movie) => {
        setFavorites(prev => [...prev, movie]);
    }
    
    const removeFavorite = (movieId) => {
        setFavorites(prev => prev.filter(m => m.id !== movieId));
    }
    
    const isFavorite = (movieId) => {
        return favorites.some(m => m.id === movieId);
    }

    const showToast = (message) => {
        setToastMessage(message);
        setTimeout(() => {
            setToastMessage(null);
        }, 3000);
    }
    
    const value = { 
        favorites, 
        addFavorite, 
        removeFavorite, 
        isFavorite,
        searchQuery,
        setSearchQuery,
        toastMessage,
        showToast
    };
    
    return <MovieContext.Provider value={value}>{children}</MovieContext.Provider>
}
