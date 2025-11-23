import { useState } from "react";
import "../css/logoHover.css";
import logo from "../assets/logo.svg";

function BrandLogo() {
  const [hover, setHover] = useState(false);

  return (
    <div
      className={`logo-wrapper ${hover ? "hovering" : ""}`}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <img src={logo} alt="LibraryX Logo" className="brand-logo" />
      <span className="logo-pulse" />
    </div>
  );
}

export default BrandLogo;
