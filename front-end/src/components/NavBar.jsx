import { Link } from "react-router-dom";
import "../css/navbar.css";

function NavBar() {
  return (
    <nav className="nav-wrapper">
      <div className="nav-logo">🎬 MovieApp</div>

      <ul className="nav-menu">

        {/* HOME */}
        <li style={{ "--clr": "#00eaff" }}>
          <Link to="/">
            <i className="fa-solid fa-house"></i>
            <span>Home</span>
          </Link>
        </li>

        {/* FAVORITES */}
        <li style={{ "--clr": "#ffd700" }}>
          <Link to="/favourite">
            <i className="fa-solid fa-star"></i>
            <span>Favorites</span>
          </Link>
        </li>

        {/* PROFILE */}
        <li style={{ "--clr": "#ff4d94" }}>
          <Link to="/profile">
            <i className="fa-solid fa-user"></i>
            <span>Profile</span>
          </Link>
        </li>

      </ul>
    </nav>
  );
}

export default NavBar;
