// src/components/Sphere.jsx
import { useEffect, useMemo, useRef, useState } from "react";
import "../css/sphere.css";

function Sphere({ movies = [] }) {
  const [rotation, setRotation] = useState(0); // global wheel rotation (deg)
  const rotationRef = useRef(0);
  const [isDragging, setIsDragging] = useState(false);
  const dragRef = useRef({ lastX: 0 });
  const [selected, setSelected] = useState(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isSnapping, setIsSnapping] = useState(false);

  const step = useMemo(
    () => (movies.length > 0 ? 360 / movies.length : 0),
    [movies.length]
  );

  // keep ref in sync with state
  useEffect(() => {
    rotationRef.current = rotation;
  }, [rotation]);

  const normalizeAngle = (deg) => {
    let a = deg % 360;
    if (a > 180) a -= 360;
    if (a < -180) a += 360;
    return a;
  };

  // update which item is closest to the top (highlight)
  useEffect(() => {
    if (!movies.length || !step) return;
    const current = rotationRef.current;
    let bestIdx = 0;
    let bestDiff = Infinity;

    for (let i = 0; i < movies.length; i++) {
      const angle = normalizeAngle(i * step + current);
      const diff = Math.abs(angle);
      if (diff < bestDiff) {
        bestDiff = diff;
        bestIdx = i;
      }
    }
    setActiveIndex(bestIdx);
  }, [rotation, movies.length, step]);

  const handlePointerDown = (e) => {
    if (!movies.length) return;
    setIsDragging(true);
    setIsSnapping(false);
    dragRef.current.lastX = e.clientX;
  };

  const handlePointerMove = (e) => {
    if (!isDragging) return;
    const dx = e.clientX - dragRef.current.lastX;
    dragRef.current.lastX = e.clientX;

    // drag left → rotate clockwise, drag right → rotate anticlockwise
    setRotation((prev) => prev - dx * 0.4);
  };

  const snapToNearest = () => {
    if (!movies.length || !step) return;
    const current = rotationRef.current;

    let bestIdx = 0;
    let bestDiff = Infinity;
    let angleBest = 0;

    for (let i = 0; i < movies.length; i++) {
      const angle = normalizeAngle(i * step + current);
      const diff = Math.abs(angle);
      if (diff < bestDiff) {
        bestDiff = diff;
        bestIdx = i;
        angleBest = angle;
      }
    }

    const targetRotation = current - angleBest; // make that item exactly at angle 0 (top)
    setIsSnapping(true);
    setRotation(targetRotation);
    setTimeout(() => setIsSnapping(false), 260);
  };

  const handlePointerUp = () => {
    if (!isDragging) return;
    setIsDragging(false);
    snapToNearest();
  };

  const items = useMemo(
    () =>
      movies.map((m, idx) => ({
        id: m.id ?? idx,
        title: m.title ?? m.Title ?? "Unknown",
        year: m.year ?? m.Year ?? "N/A",
        poster:
          m.poster ??
          m.Poster ??
          "https://via.placeholder.com/300x450?text=No+Image",
      })),
    [movies]
  );

  return (
    <>
      <div
        className="sphere-wrapper"
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerLeave={handlePointerUp}
      >
        <div className="sphere-ring-container">
          <div
            className={
              "sphere-ring" + (isSnapping ? " sphere-ring--snapping" : "")
            }
            style={{ "--ringRotation": `${rotation}deg` }}
          >
            {items.map((movie, index) => (
              <button
                key={movie.id}
                className={
                  "sphere-ring-item" +
                  (index === activeIndex ? " sphere-ring-item--active" : "")
                }
                style={{ "--itemAngle": `${index * step}deg` }}
                onClick={() => setSelected(movie)}
              >
                <div className="sphere-ring-item-inner">
                  <img src={movie.poster} alt={movie.title} draggable="false" />
                </div>
              </button>
            ))}
          </div>
        </div>

        <div className="sphere-overlay-gradient" />
      </div>

      {selected && (
        <div
          className="sphere-modal-backdrop"
          onClick={() => setSelected(null)}
        >
          <div
            className="sphere-modal-card"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="sphere-modal-image-wrap">
              <img src={selected.poster} alt={selected.title} />
            </div>
            <div className="sphere-modal-info">
              <h2>{selected.title}</h2>
              <p className="sphere-modal-year">{selected.year}</p>
              <p className="sphere-modal-meta">
                Drag the wheel or tap another poster to explore.
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Sphere;
