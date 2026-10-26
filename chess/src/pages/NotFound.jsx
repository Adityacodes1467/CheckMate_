import { Link } from "react-router-dom";
import "./Pages.css";

// Shown for any URL that doesn't match a route
function NotFound() {
    return (
        <div className="page not-found">
            <img src="/pieces/king-w.svg" alt="" className="not-found-icon" />
            <span className="label">Error 404</span>
            <h1>Square not found</h1>
            <p>There's nothing on this square. The page you're looking for doesn't exist.</p>
            <Link to="/" className="btn btn-primary btn-large">
                Back to home <span className="arrow">→</span>
            </Link>
        </div>
    );
}

export default NotFound;
