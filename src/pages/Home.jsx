import MovieCard from "../components/MovieCard"
import {useState} from "react"

function Home() {
    const [searchQuery, setSearchQuery] = useState("");

    const movies = [
        {id: 1, title: "strawberry shortcake", release_date: "2022"},
        {id: 2, title: "Narnia", release_date: "2000"},
        {id: 3, title: "Harry potter", release_date: "1999"},
    ];

    const handleSearch = () => {
        e.preventDefault()
        alert(searchQuery)
    };
    
    return (
    <div className="home">
        <form onSubmit={handleSearch} className="search-form">
            <input type="text" placeholder="Search for a movie..." className="search-input" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}/>
            <button type="submit" className="search-button">Search</button>
        </form>


        <div className="movies-grid">
            {movies.map((movie) => (
                movie.title.toLowerCase().startsWith(searchQuery.toLowerCase()) && 
                <MovieCard movie={movie} key={movie.id}/>
                )
            )}
        </div>
    </div>
    );
}

export default Home