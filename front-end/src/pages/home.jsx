import { useEffect, useState } from "react";
import "../css/home.css";
import { searchMovies } from "../services/api";
import OrbitalGallery from "../components/OrbitalGallery";
import NavBar from "../components/NavBar";

const POPULAR_QUERIES = ["marvel", "action", "drama", "comedy", "sci-fi"];

function Home() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadPopularMovies = async () => {
    setLoading(true);

    const seen = new Set();
    const list = [];

    for (const term of POPULAR_QUERIES) {
      try {
        const result = await searchMovies(term, 1);

        (result.movies || []).forEach((movie) => {
          if (!seen.has(movie.id)) {
            seen.add(movie.id);
            list.push(movie);
          }
        });
      } catch (err) {
        console.error("Popular fetch error:", err);
      }
    }

    setMovies(list);
    setLoading(false);
  };

  useEffect(() => {
    loadPopularMovies();
  }, []);

  const handleSearch = async (value) => {
    if (!value.trim()) {
      loadPopularMovies();
      return;
    }

    setLoading(true);

    try {
      const result = await searchMovies(value, 1);
      setMovies(result.movies || []);
    } catch (err) {
      console.error("Search failed:", err);
      setMovies([]);
    }

    setLoading(false);
  };

  // Listen for navbar search event
  useEffect(() => {
    const listener = (e) => handleSearch(e.detail);
    window.addEventListener("search", listener);
    return () => window.removeEventListener("search", listener);
  }, []);

  return (
    <>
      <NavBar onSearch={(text) =>
        window.dispatchEvent(new CustomEvent("search", { detail: text }))
      }/>

      <div className="home">
        {loading && (
          <div className="orbital-loading">
            <div className="orbital-loading-orb" />
            <p>Loading movies…</p>
          </div>
        )}

        {!loading && movies.length === 0 && (
          <div className="status-text empty-text">❌ No results found.</div>
        )}

        {!loading && movies.length > 0 && (
          <OrbitalGallery movies={movies} />
        )}
      </div>
    </>
  );
}

export default Home;
