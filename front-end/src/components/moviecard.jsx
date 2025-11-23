import "../css/moviecard.css";

function Moviecard({ movie }) {
  function onFavclick() {
    alert("clicked");
  }

  return (
    <div className="movie-card">
      <div className="movie-poster">
        <img 
          src={movie.poster} 
          alt={movie.title} 
        />
        <div className="movie-overlay">
          <button className="fav-btn" onClick={onFavclick}>❤️</button>
        </div>
      </div>

      <div className="movie-info">
        <h3>{movie.title}</h3>
        <p>{movie.release_date}</p>
      </div>
    </div>
  );
}

export default Moviecard;
