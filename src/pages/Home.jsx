import { useState } from "react";
import MovieCard from "../components/MovieCard";
import "../css/Home.css";

function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  
  const handleSearch = (e) => {
    e.preventDefault();
    alert(`Searching for ${searchQuery}`);
  };

  const movies = [
    {
      id: 1,
      title: "Inception",
      release_date: "2010",
      url: "https://image.tmdb.org/t/p/w500/9gk7adHYeDvHkCSEqAvQNLV5Uge.jpg"
    },
    {
      id: 2,
      title: "Interstellar",
      release_date: "2014",
      url: "https://image.tmdb.org/t/p/w500/gEU2QlsUUQZnSn44X585zF8F.jpg"
    },
    {
      id: 3,
      title: "The Dark Knight",
      release_date: "2008",
      url: "https://image.tmdb.org/t/p/w500/qJ2tW6WMUDux911r6m7haRef0WH.jpg"
    },
    {
      id: 4,
      title: "Dune",
      release_date: "2021",
      url: "https://image.tmdb.org/t/p/w500/d5NXSklXo0qyIYkgV94XAgMIckC.jpg"
    }
  ];

  return (
    <div className="home">
      <form onSubmit={handleSearch} className="search-form">
        <input 
          type="text" 
          placeholder="Search for movies..." 
          className="search-input"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button type="submit" className="search-button">Search</button>
      </form>

      <div className="movies-grid">
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </div>
  );
}

export default Home;
