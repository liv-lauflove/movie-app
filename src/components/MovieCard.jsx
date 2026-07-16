import "../css/MovieCard.css";
import { useMovieContext } from "../contexts/MovieContext";

const GENRES = {
  28: "Action", 12: "Adventure", 16: "Animation", 35: "Comedy", 80: "Crime",
  99: "Documentary", 18: "Drama", 10751: "Family", 14: "Fantasy", 36: "History",
  27: "Horror", 10402: "Music", 9648: "Mystery", 10749: "Romance", 878: "Sci-Fi",
  10770: "TV", 53: "Thriller", 10752: "War", 37: "Western"
};

function MovieCard({movie}) {
    const { isFavorite, addFavorite, removeFavorite } = useMovieContext();
    const favorite = isFavorite(movie.id);

    function onFavoriteClick(e) {
        e.preventDefault();
        if (favorite) removeFavorite(movie.id);
        else addFavorite(movie);
    }

    return (
        <div className="movie-card">
            <div className="movie-poster">
                <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title}/>
                <div className="movie-overlay">
                    <button className={`favorite-btn ${favorite ? "active" : ""}`} onClick={onFavoriteClick}>
                        ♥
                    </button>
                </div>
            </div>
            <div className="movie-info">
                <h3>{movie.title}</h3>
                <p>{movie.release_date?.split("-")[0]}</p>
                <div className="movie-genres">
                    {movie.genre_ids?.slice(0, 3).map(id => (
                        <span key={id} className="genre-badge">{GENRES[id] || "Genre"}</span>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default MovieCard;
