import { Link } from "react-router-dom";
import "./Footer.css";

function Footer() {
    const year = new Date().getFullYear();

    return (
        <footer className="footer">
            <div className="footer-inner">

                <p className="footer-quote">
                    “Every chess master was once a beginner.”
                </p>

                <nav className="footer-links">
                    <Link to="/">Home</Link>
                    <Link to="/play">Play</Link>
                    <Link to="/dashboard">Dashboard</Link>
                    <Link to="/how-to-play">Rules</Link>
                    <Link to="/about">About</Link>
                </nav>

            </div>

            <div className="footer-bottom">
                <span>© {year} CheckMate</span>
                <span>Made with React, Vite &amp; chess.js</span>
            </div>
        </footer>
    );
}

export default Footer;
