import { useMovieContext } from "../context/moviecontext.jsx";
import "../css/moviecard.css";

function MovieCard({ movie }) {
  const { addToFavorites, removeFromFavorites, isFavorite } = useMovieContext();

  const normalizedMovie = {
    id: movie.imdbID || movie.id,
    title: movie.Title || movie.title || "Unknown",
    year: movie.Year || movie.year || movie.release_date?.slice(0, 4) || "N/A",
    poster:
      movie.Poster && movie.Poster !== "N/A"
        ? movie.Poster
        : movie.poster ||
          (movie.poster_path
            ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
            : "https://via.placeholder.com/300x450?text=No+Image"),
  };

  const { id, title, year, poster } = normalizedMovie;
  const favorite = isFavorite(id);

  const toggleFavorite = () =>
    favorite ? removeFromFavorites(id) : addToFavorites(normalizedMovie);

  return (
    <div className="movie-card">
      <div className="movie-poster">
        <img src={poster} alt={`${title} poster`} loading="lazy" />

        <button
          className={`fav-btn ${favorite ? "active" : ""}`}
          onClick={toggleFavorite}
          aria-label="Toggle Favorite"
        >
          {favorite ? "💔" : "❤️"}
        </button>
      </div>

      <div className="movie-info">
        <h3 title={title}>
          {title.length > 22 ? title.slice(0, 20) + "..." : title}
        </h3>
        <span>{year}</span>
      </div>
    </div>
  );
}

export default MovieCard;
