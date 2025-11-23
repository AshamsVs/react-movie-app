import { useEffect, useMemo, useRef, useState } from "react";
import { useMovieContext } from "../context/moviecontext.jsx";
import "../css/orbital.css";

function OrbitalGallery({ movies = [] }) {
  const { addToFavorites, removeFromFavorites, isFavorite } = useMovieContext();

  const [selectedIndex, setSelectedIndex] = useState(0);
  const stripRef = useRef(null);
  const itemRefs = useRef([]);

  const items = useMemo(
    () =>
      (movies || []).map((m, i) => ({
        id: m.id ?? m.imdbID ?? i,
        title: m.title ?? m.Title ?? "Unknown",
        year: m.year ?? m.Year ?? "N/A",
        rating: m.rating ?? m.imdbRating ?? "N/A",
        poster:
          m.poster ??
          m.Poster ??
          "https://via.placeholder.com/400x600?text=No+Image",
      })),
    [movies]
  );

  useEffect(() => {
    if (items.length > 0) setSelectedIndex(0);
  }, [items.length]);

  const scrollToIndex = (index) => {
    const container = stripRef.current;
    const el = itemRefs.current[index];
    if (!container || !el) return;

    const offset =
      el.offsetLeft -
      container.clientWidth / 2 +
      el.clientWidth / 2;

    container.scrollTo({ left: offset, behavior: "smooth" });
  };

  const handleSelect = (index) => {
    setSelectedIndex(index);
    scrollToIndex(index);
  };

  if (!items.length) {
    return (
      <div className="appletv-empty">
        <p>No movies available.</p>
      </div>
    );
  }

  const featured = items[selectedIndex];
  const fav = isFavorite(featured.id);

  const toggleFav = () => {
    const normalized = {
      id: featured.id,
      title: featured.title,
      year: featured.year,
      rating: featured.rating,
      poster: featured.poster,
    };

    fav ? removeFromFavorites(normalized.id) : addToFavorites(normalized);
  };

  return (
    <div className="appletv-wrapper">
      <div
        className="appletv-hero"
        style={{ "--hero-bg": `url(${featured.poster})` }}
      >
        <div className="appletv-hero-overlay" />
        <div className="appletv-hero-content">
          <div className="appletv-hero-poster">
            <img src={featured.poster} alt={featured.title} />
          </div>

          <div className="appletv-hero-text">
            <h1>{featured.title}</h1>
            <p className="appletv-hero-year">{featured.year}</p>
            <p className="appletv-hero-subtitle">⭐ IMDb {featured.rating}</p>

            <button
              onClick={toggleFav}
              className={`fav-toggle ${fav ? "fav-active" : ""}`}
            >
              <i className={fav ? "fa-solid fa-heart" : "fa-regular fa-heart"}></i>
            </button>
          </div>
        </div>
      </div>

      <div className="appletv-strip-container">
        <h2 className="appletv-strip-title">All Movies</h2>

        <div className="appletv-strip" ref={stripRef}>
          {items.map((movie, index) => (
            <button
              key={movie.id}
              className={
                "appletv-strip-item" +
                (index === selectedIndex ? " appletv-strip-item--active" : "")
              }
              onClick={() => handleSelect(index)}
              ref={(el) => (itemRefs.current[index] = el)}
            >
              <div className="appletv-strip-poster">
                <img src={movie.poster} alt={movie.title} loading="lazy" />
              </div>
              <span className="appletv-strip-label">
                {movie.title.length > 18
                  ? movie.title.slice(0, 16) + "…"
                  : movie.title}
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default OrbitalGallery;
