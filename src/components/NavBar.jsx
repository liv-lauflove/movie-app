import { Link, useNavigate, useLocation } from "react-router-dom";
import { useMovieContext } from "../contexts/MovieContext";
import "../css/NavBar.css";

function NavBar() {
  const { searchQuery, setSearchQuery } = useMovieContext();
  const navigate = useNavigate();
  const location = useLocation();

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    // If user is searching but not on Home page, navigate to Home
    if (location.pathname !== "/" && e.target.value.trim() !== "") {
        navigate("/");
    }
  };

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <Link to="/">MovieFlix</Link>
      </div>

      <div className="navbar-search">
        <input 
          type="text" 
          placeholder="Search movies..." 
          className="nav-search-input"
          value={searchQuery}
          onChange={handleSearchChange}
        />
      </div>

      <div className="navbar-links">
        <Link to="/" className="nav-link">Home</Link>
        <Link to="/favorites" className="nav-link">Favorites</Link>
      </div>
    </nav>
  );
}

export default NavBar;
