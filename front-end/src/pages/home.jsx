// src/pages/home.jsx
import { useEffect, useState } from "react";
import "../css/home.css";
import { searchMovies } from "../services/api.js";
import Sphere from "../components/Sphere.jsx";

const POPULAR_QUERIES = ["marvel", "action", "drama", "comedy", "sci-fi"];

function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch multiple categories and merge into one big list
  const loadPopularSphere = async () => {
    setLoading(true);

    const seen = new Set();
    const allMovies = [];

    for (const term of POPULAR_QUERIES) {
      try {
        const response = await searchMovies(term, 1); // your api.js returns { movies, totalResults }
        (response.movies || []).forEach((m) => {
          if (!seen.has(m.id)) {
            seen.add(m.id);
            allMovies.push(m);
          }
        });
      } catch (err) {
        console.error(`Error loading "${term}" movies:`, err);
      }
    }

    setMovies(allMovies);
    setLoading(false);
  };

  useEffect(() => {
    loadPopularSphere();
  }, []);

  const handleSearch = async (text) => {
    setSearchQuery(text);

    const trimmed = text.trim();
    if (!trimmed) {
      // reset to popular sphere when search cleared
      loadPopularSphere();
      return;
    }

    setLoading(true);
    try {
      const response = await searchMovies(trimmed, 1);
      setMovies(response.movies || []);
    } catch (err) {
      console.error("Search error:", err);
      setMovies([]);
    }
    setLoading(false);
  };

  return (
    <div className="home">
      <form className="Search-form" onSubmit={(e) => e.preventDefault()}>
        <input
          type="text"
          placeholder="Search movies..."
          className="Search-input"
          value={searchQuery}
          onChange={(e) => handleSearch(e.target.value)}
        />
      </form>

      {loading && (
        <div className="sphere-loading">
          <div className="sphere-loading-orb" />
          <p>Loading your movie universe…</p>
        </div>
      )}

      {!loading && movies.length === 0 && (
        <div className="status-text empty-text">
          🔍 No movies found. Try another search.
        </div>
      )}

      {!loading && movies.length > 0 && <Sphere movies={movies} />}
    </div>
  );
}

export default Home;
