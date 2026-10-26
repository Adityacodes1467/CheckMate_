import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { usePlayer } from "../context/PlayerContext";
import "./Navbar.css";

const links = [
  { to: "/", label: "Home" },
  { to: "/how-to-play", label: "Rules" },
  { to: "/about", label: "About" },
  { to: "/dashboard", label: "Dashboard" },
];

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { profile } = usePlayer();
  const closeMenu = () => setMenuOpen(false);

  return (
    <header className="navbar">
      <div className="navbar-inner">
        <Link to="/" className="brand" onClick={closeMenu}>
          <span className="brand-mark" aria-hidden="true">
            <span /><span /><span /><span />
          </span>
          <span className="brand-name">Check<em>Mate</em></span>
        </Link>

        <button
          className="menu-toggle"
          type="button"
          onClick={() => setMenuOpen((open) => !open)}
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
        >
          {menuOpen ? "Close" : "Menu"}
        </button>

        <nav className={`nav-links ${menuOpen ? "open" : ""}`} aria-label="Main navigation">
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.to === "/"}
              className="nav-link"
              onClick={closeMenu}
            >
              {link.label}
            </NavLink>
          ))}

          <NavLink to="/play" className="nav-play" onClick={closeMenu}>
            Play <span className="arrow">→</span>
          </NavLink>

          <NavLink to="/dashboard" className="nav-player" onClick={closeMenu} title="Open player profile">
            <span className="nav-player-avatar" aria-hidden="true">
              {(profile.displayName.trim()[0] || "G").toUpperCase()}
            </span>
            <span className="nav-player-name">{profile.displayName}</span>
          </NavLink>
        </nav>
      </div>
    </header>
  );
}

export default Navbar;
