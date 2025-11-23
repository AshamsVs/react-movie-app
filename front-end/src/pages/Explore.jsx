// src/pages/Explore.jsx
import { useEffect, useState, useRef } from "react";
import NavBar from "../components/NavBar.jsx";
import { getPopularMovies } from "../services/api.js";
import "../css/explore.css";

function Explore() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const sphereRef = useRef(null);

  // For rotation + dragging
  const rotationRef = useRef(0);
  const isDraggingRef = useRef(false);
  const dragStartRef = useRef({ x: 0, rotationAtStart: 0 });

  // Load some movies for posters
  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);
        const { movies } = await getPopularMovies();
        // Limit to first 24 posters so sphere looks clean
        setMovies(movies.slice(0, 24));
      } catch (err) {
        console.error("Failed to load movies for Explore sphere:", err);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  // Auto-rotate slowly (Apple TV style)
  useEffect(() => {
    const sphereEl = sphereRef.current;
    if (!sphereEl) return;

    let frameId;

    const tick = () => {
      if (!isDraggingRef.current) {
        rotationRef.current += 0.03; // slow, elegant
        sphereEl.style.transform = `
          translateZ(-420px)
          rotateY(${rotationRef.current}deg)
        `;
      }
      frameId = requestAnimationFrame(tick);
    };

    frameId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frameId);
  }, []);

  // Pointer / mouse drag to rotate
  const handlePointerDown = (e) => {
    if (!sphereRef.current) return;
    isDraggingRef.current = true;

    dragStartRef.current = {
      x: e.clientX,
      rotationAtStart: rotationRef.current,
    };

    sphereRef.current.setPointerCapture(e.pointerId);
    document.body.style.cursor = "grabbing";
  };

  const handlePointerMove = (e) => {
    if (!isDraggingRef.current || !sphereRef.current) return;

    const deltaX = e.clientX - dragStartRef.current.x;
    const sensitivity = 0.25; // smaller = slower rotation on drag

    const newRotation = dragStartRef.current.rotationAtStart + deltaX * sensitivity;
    rotationRef.current = newRotation;

    sphereRef.current.style.transform = `
      translateZ(-420px)
      rotateY(${rotationRef.current}deg)
    `;
  };

  const stopDragging = (e) => {
    if (!isDraggingRef.current || !sphereRef.current) return;
    isDraggingRef.current = false;
    try {
      sphereRef.current.releasePointerCapture(e.pointerId);
    } catch (_) {
      // ignore if pointerId already released
    }
    document.body.style.cursor = "default";
  };

  return (
    <div className="explore-page">
      <NavBar />

      <main className="explore-main">
        <section className="explore-hero">
          <h1 className="explore-title">Explore in 3D</h1>
          <p className="explore-subtitle">
            A calm, cinematic sphere of posters. Drag to rotate. Hover to highlight.
          </p>
        </section>

        <section className="explore-sphere-section">
          {loading && (
            <div className="explore-loading">Loading posters...</div>
          )}

          {!loading && movies.length === 0 && (
            <div className="explore-empty">
              No movies available to display.
            </div>
          )}

          {!loading && movies.length > 0 && (
            <div className="sphere-stage">
              <div
                className="sphere"
                ref={sphereRef}
                onPointerDown={handlePointerDown}
                onPointerMove={handlePointerMove}
                onPointerUp={stopDragging}
                onPointerCancel={stopDragging}
              >
                {movies.map((movie, index) => {
                  const imgSrc =
                    movie.Poster && movie.Poster !== "N/A"
                      ? movie.Poster
                      : "https://via.placeholder.com/300x450?text=No+Image";

                  return (
                    <div
                      key={movie.id || movie.imdbID || index}
                      className="sphere-item"
                      style={{
                        "--item-index": index,
                        "--item-count": movies.length,
                      }}
                    >
                      <div className="sphere-poster">
                        <img src={imgSrc} alt={movie.Title || "Movie poster"} />
                        <div className="sphere-poster-overlay" />
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="sphere-hint">
                🖱 Drag horizontally to rotate &nbsp;•&nbsp; Hover a poster to focus
              </div>
            </div>
          )}
        </section>
      </main>
    </div>
  );
}

export default Explore;
