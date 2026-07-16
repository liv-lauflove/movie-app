import { useState, useEffect } from "react";
import MovieCard from "../components/MovieCard";
import { searchMovies, getPopularMovies } from "../services/api";
import "../css/Home.css";

function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchPopularMovies = async () => {
        try {
          const popularMovies = await getPopularMovies();
          setMovies(popularMovies);
        } catch (err) {
            console.log(err);
            setError("Failed to fetch popular movies.");
        }
        finally{
            setLoading(false);
        }
    }
    
    fetchPopularMovies();
  }, []);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    
    if (loading) return;
    setLoading(true);
    setError(null);

    try {
        const searchResults = await searchMovies(searchQuery);
        setMovies(searchResults);
    } catch (err) {
        console.log(err);
        setError("Failed to search movies.");
    } finally {
        setLoading(false);
    }
  };

  return (
    <div className="home">
      <div className="hero-section">
        <h1>Discover Your Next <span className="highlight">Favorite</span> Movie</h1>
      </div>

      <form onSubmit={handleSearch} className="search-form">
        <input 
          type="text" 
          placeholder="Search for movies, actors, directors..." 
          className="search-input"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button type="submit" className="search-button">Search</button>
      </form>

      {error && <div className="error-message">{error}</div>}

      {loading ? (
        <div className="loading">Searching movies...</div>
      ) : (
        <div className="movies-grid">
          {movies.map((movie) => (
            movie.poster_path && <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      )}
    </div>
  );
}

export default Home;
