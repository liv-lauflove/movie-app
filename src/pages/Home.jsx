import { useState, useEffect } from "react";
import MovieCard from "../components/MovieCard";
import { searchMovies, getPopularMovies } from "../services/api";
import { useMovieContext } from "../contexts/MovieContext";
import "../css/Home.css";

function Home() {
  const { searchQuery } = useMovieContext();
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchMovies = async () => {
      setLoading(true);
      setError(null);
      try {
        if (searchQuery.trim() === "") {
          const popularMovies = await getPopularMovies();
          setMovies(popularMovies);
        } else {
          const searchResults = await searchMovies(searchQuery);
          setMovies(searchResults);
        }
      } catch (err) {
          console.log(err);
          setError("Failed to load movies.");
      } finally {
          setLoading(false);
      }
    };
    
    // Add a small delay (debounce) so it doesn't fetch on every single keystroke instantly
    const debounceTimer = setTimeout(() => {
      fetchMovies();
    }, 500);

    return () => clearTimeout(debounceTimer);
  }, [searchQuery]);

  return (
    <div className="home">
      {searchQuery.trim() === "" && (
        <div className="hero-section">
          <h1>Discover Your Next <span className="highlight">Favorite</span> Movie</h1>
        </div>
      )}

      {searchQuery.trim() !== "" && (
        <div className="search-results-header">
          <h2>Results for <span className="highlight">"{searchQuery}"</span></h2>
        </div>
      )}

      {error && <div className="error-message">{error}</div>}

      {loading ? (
        <div className="loading">Loading movies...</div>
      ) : (
        <div className="movies-grid">
          {movies.map((movie) => (
            movie.poster_path && <MovieCard key={movie.id} movie={movie} />
          ))}
          {movies.length === 0 && !loading && !error && (
            <div className="no-results">No movies found. Try a different search!</div>
          )}
        </div>
      )}
    </div>
  );
}

export default Home;
