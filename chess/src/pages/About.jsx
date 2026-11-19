import { Link } from "react-router-dom";
import "./Pages.css";

// Update names and roles here if the team changes
const team = [
    { name: "Aditya", role: "Game controller, chess engine integration & website pages" },
    { name: "Harjas", role: "Game information & move history" },
    { name: "Harman", role: "Chessboard, squares & pieces" },
];

const techStack = [
    { name: "React", text: "Components, props and state for the whole interface." },
    { name: "React Router", text: "Separate pages (Home, Play, Rules, About) without page reloads." },
    { name: "chess.js", text: "Rules engine that validates every move and detects check, checkmate and draws." },
    { name: "Vite", text: "Fast development server and production build tool." },
    { name: "CSS Grid & Flexbox", text: "The 8×8 board layout and responsive page design." },
];

function About() {
    return (
        <div className="page">

            <header className="page-header">
                <span className="label">About the project</span>
                <h1>About CheckMate</h1>
                <p>
                    CheckMate is a chess website made by a team of three CSE AIML students.
                    It began as a simple React chessboard and grew into a complete
                    two-player chess game with every rule of chess built in.
                </p>
            </header>

            <section className="page-section">
                <h2>The team</h2>

                <div className="team-grid">
                    {team.map((member, index) => (
                        <div className="team-card" key={member.name}>
                            <span className="team-number">
                                {String(index + 1).padStart(2, "0")}
                            </span>
                            <h3>{member.name}</h3>
                            <p>{member.role}</p>
                        </div>
                    ))}
                </div>
            </section>

            <section className="page-section">
                <h2>Built with</h2>

                <dl className="spec-list">
                    {techStack.map((tech) => (
                        <div key={tech.name}>
                            <dt>{tech.name}</dt>
                            <dd>{tech.text}</dd>
                        </div>
                    ))}
                </dl>
            </section>

            <section className="page-section center">
                <Link to="/play" className="btn btn-primary btn-large">
                    Play a game <span className="arrow">→</span>
                </Link>
            </section>

        </div>
    );
}

export default About;
