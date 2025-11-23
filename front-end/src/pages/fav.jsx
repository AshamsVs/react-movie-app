// src/pages/fav.jsx
import { useMovieContext } from "../context/moviecontext.jsx";
import Moviecard from "../components/Moviecard";
import "../css/fav.css";

function Favorite() {
  const { favorites } = useMovieContext();

  if (!favorites || favorites.length === 0) {
    return (
      <div className="Fav-empty">
        <h2>No favorite movies yet</h2>
        <p>Start adding movies to favorites and they will appear here...</p>
      </div>
    );
  }

  return (
    <div className="Fav-list">
      <h2>Your Favorites ❤️</h2>
      <div className="movie-grid">
        {favorites.map((movie) => (
          <Moviecard key={movie.id} movie={movie} />
        ))}
      </div>
    </div>
  );
}

export default Favorite;
