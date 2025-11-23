import { Link } from "react-router-dom";
import "../css/navbar.css";

function NavBar() {
  return (
    <nav className="nav-wrapper">
      <div className="nav-logo">🎬Library</div>

      <ul className="nav-menu">
        <li style={{ "--clr": "#00E9FF" }}>
          <Link to="/">
            <i className="fa-solid fa-house"></i>
          </Link>
        </li>

        <li style={{ "--clr": "#C500FF" }}>
          <Link to="/explore">
            <i className="fa-solid fa-compass"></i>
          </Link>
        </li>

        <li style={{ "--clr": "#FF2075" }}>
          <Link to="/favorites">
            <i className="fa-solid fa-heart"></i>
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default NavBar;
