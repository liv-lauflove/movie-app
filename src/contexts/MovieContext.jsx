import {createContext, useState, useContext, useEffect} from 'react';

const MovieContext = createContext();
export const useMovieContext = () => useContext(MovieContext);

export const MovieProvider = ({children}) => {
    const [favorites, setFavorites] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [toastMessage, setToastMessage] = useState(null);
    
    useEffect(() => {
        const storedFavs = localStorage.getItem('favorites');
        if (storedFavs) setFavorites(JSON.parse(storedFavs));
    }, []);

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
