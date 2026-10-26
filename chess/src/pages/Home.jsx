import { Link } from "react-router-dom";
import Piece from "../components/Piece";
import { initialBoard } from "../data/initialBoard";
import "./Home.css";

const FILES = "abcdefgh";

const features = [
    {
        title: "Only legal moves",
        text: "A rules engine checks every move before it is played. Pawns can't jump, kings can't walk into check.",
    },
    {
        title: "Check, mate & stalemate",
        text: "The board warns you when your king is attacked and announces the result the moment a game ends.",
    },
    {
        title: "Every special rule",
        text: "Castling, en passant and pawn promotion work exactly as they do over a real board.",
    },
    {
        title: "Click or drag",
        text: "Pick up a piece any way you like. Small markers show every square it is allowed to reach.",
    },
    {
        title: "A written scoresheet",
        text: "Moves are recorded in algebraic notation, the same way players write them down in tournaments.",
    },
    {
        title: "Flip, undo, restart",
        text: "Look at the game from Black's side, take back a slip, or set the pieces up again in one click.",
    },
];

const notationKey = [
    { symbol: "K Q R B N", meaning: "King, Queen, Rook, Bishop, Knight" },
    { symbol: "e4", meaning: "A pawn move to the e4 square" },
    { symbol: "x", meaning: "A capture" },
    { symbol: "+", meaning: "Check" },
    { symbol: "#", meaning: "Checkmate" },
    { symbol: "O-O", meaning: "Castling (short side)" },
    { symbol: "=Q", meaning: "Pawn promotes to a queen" },
];

// The starting position drawn like a diagram in a chess book,
// using the same initialBoard data and Piece component as the game.
function DiagramBoard() {
    return (
        <figure className="diagram">
            <div className="diagram-frame">

                <div className="diagram-ranks" aria-hidden="true">
                    {[8, 7, 6, 5, 4, 3, 2, 1].map((rank) => (
                        <span key={rank}>{rank}</span>
                    ))}
                </div>

                <div className="diagram-board">
                    {initialBoard.map((row, y) =>
                        row.map((piece, x) => (
                            <div
                                key={`${x}-${y}`}
                                className={`diagram-square ${(x + y) % 2 === 1 ? "dark" : "light"}`}
                            >
                                <Piece piece={piece} />
                            </div>
                        ))
                    )}
                </div>

                <div className="diagram-files" aria-hidden="true">
                    {FILES.split("").map((file) => (
                        <span key={file}>{file}</span>
                    ))}
                </div>

            </div>

            <figcaption>
                “Chess is life in miniature.” <strong>— Garry Kasparov</strong>
            </figcaption>
        </figure>
    );
}

function Home() {
    return (
        <div className="home">

            {/* ---------- HERO ---------- */}
            <section className="hero">
                <div className="hero-text">
                    <span className="label">A chess board for two players</span>

                    <h1>
                        Two players.<br />
                        One board.<br />
                        <em>No illegal moves.</em>
                    </h1>

                    <p>
                        CheckMate is a chess website for playing a full game with a friend
                        on the same screen. Every rule is enforced, every move is written
                        down, and the board tells you when the game is over.
                    </p>

                    <div className="hero-actions">
                        <Link to="/play" className="btn btn-primary btn-large">
                            Start a game <span className="arrow">→</span>
                        </Link>
                        <Link to="/how-to-play" className="btn btn-ghost btn-large">
                            Read the rules
                        </Link>
                    </div>
                </div>

                <DiagramBoard />
            </section>

            {/* ---------- FEATURES ---------- */}
            <section className="section">
                <div className="section-head">
                    <span className="label">What's on the board</span>
                    <h2>Built to play real chess</h2>
                </div>

                <ol className="feature-list">
                    {features.map((feature, index) => (
                        <li key={feature.title}>
                            <span className="feature-number">
                                {String(index + 1).padStart(2, "0")}
                            </span>
                            <div>
                                <h3>{feature.title}</h3>
                                <p>{feature.text}</p>
                            </div>
                        </li>
                    ))}
                </ol>
            </section>

            {/* ---------- NOTATION ---------- */}
            <section className="section notation">
                <div className="notation-text">
                    <span className="label">Reading the scoresheet</span>
                    <h2>Every game is written down</h2>
                    <p>
                        As you play, CheckMate records each move in algebraic notation,
                        the short code chess players use to write games down. Here is
                        how to read it.
                    </p>

                    <p className="notation-sample">
                        1. e4 e5 2. Nf3 Nc6 3. Bc4 Nf6 4. Ng5 d5 5. exd5 Nxd5 6. Nxf7
                    </p>
                </div>

                <dl className="notation-key">
                    {notationKey.map((item) => (
                        <div key={item.symbol}>
                            <dt>{item.symbol}</dt>
                            <dd>{item.meaning}</dd>
                        </div>
                    ))}
                </dl>
            </section>

            {/* ---------- CLOSING ---------- */}
            <section className="closing">
                <h2><em>Your move.</em></h2>
                <p>Set up the pieces and play a game right now.</p>
                <Link to="/play" className="btn btn-primary btn-large">
                    Open the board <span className="arrow">→</span>
                </Link>
            </section>

        </div>
    );
}

export default Home;
