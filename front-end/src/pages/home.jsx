import Moviecard from "../components/Moviecard";
import { useState, useEffect } from "react";
import "../css/home.css";
import { searchMovies, getPopularMovies } from "../services/api.js";

function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  // -------------------------------
  // Search Handler
  // -------------------------------
  const handleSearch = async (text, pageNum = 1) => {
    setSearchQuery(text);

    // If cleared → reset to homepage movies
    if (text.trim() === "") {
      const popularMovies = await getPopularMovies();
      setMovies(popularMovies);
      setPage(1);
      setTotalResults(0);
      return;
    }

    try {
      setLoading(true);
      const results = await searchMovies(text, pageNum);

      setMovies(results.Search || []);
      setTotalResults(results.totalResults || 0);
      setPage(pageNum);
      setError(null);
    } catch (err) {
      setError("❌ Failed to fetch search results.");
    } finally {
      setLoading(false);
    }
  };

  // -------------------------------
  // Load Popular Movies on Page Load
  // -------------------------------
  useEffect(() => {
    const loadMovies = async () => {
      try {
        const popularMovies = await getPopularMovies();
        setMovies(popularMovies);
      } catch (err) {
        setError("❌ Failed to load movies");
      } finally {
        setLoading(false);
      }
    };

    loadMovies();
  }, []);

  return (
    <div className="home">

      {/* Search Bar */}
      <form className="Search-form" onSubmit={(e) => e.preventDefault()}>
        <input
          type="text"
          placeholder="Search for movies..."
          className="Search-input"
          value={searchQuery}
          onChange={(e) => handleSearch(e.target.value)}
        />
      </form>

      {/* Status Messages */}
      {loading && <div className="loading">⏳ Loading movies...</div>}
      {error && <div className="error">{error}</div>}
      {!loading && !error && movies.length === 0 && (
        <div className="no-results">🔍 No movies found.</div>
      )}

      {/* Pagination */}
      {totalResults > 10 && (
        <div className="pagination">
          {page > 1 && (
            <button onClick={() => handleSearch(searchQuery, page - 1)}>⬅ Prev</button>
          )}
          {page * 10 < totalResults && (
            <button onClick={() => handleSearch(searchQuery, page + 1)}>Next ➡</button>
          )}
        </div>
      )}

      {/* Movie Grid */}
<div className="movie-grid">
  {movies.map((movie) => {
    const formattedMovie = {
      id: movie.imdbID,
      title: movie.Title,
      release_date: movie.Year,
      poster: movie.Poster !== "N/A" ? movie.Poster : "/no-image.png"
    };

    return <Moviecard key={movie.imdbID} movie={formattedMovie} />;
  })}
</div>

    </div>
  );
}

export default Home;
