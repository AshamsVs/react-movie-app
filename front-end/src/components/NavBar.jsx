import { Link } from "react-router-dom";
import BrandLogo from "./BrandLogo";
import "../css/navbar.css";

function NavBar() {
  return (
    <nav className="nav-wrapper">

      <div className="nav-left">
        <BrandLogo />

        {/* SEARCH BAR STAYS HERE */}
        <div className="nav-search">
          <input
            type="text"
            placeholder="Search..."
            className="search-input"
            onChange={(e) =>
              window.dispatchEvent(
                new CustomEvent("search", { detail: e.target.value })
              )
            }
          />
          <button type="button" className="search-btn">
            <i className="fa-solid fa-magnifying-glass"></i>
          </button>
        </div>
      </div>

      <ul className="nav-menu">
        <li style={{ "--clr": "#00E9FF" }}>
          <Link to="/"><i className="fa-solid fa-house"></i></Link>
        </li>

        <li style={{ "--clr": "#FF2075" }}>
          <Link to="/favorites"><i className="fa-solid fa-heart"></i></Link>
        </li>
      </ul>
    </nav>
  );
}

export default NavBar;
