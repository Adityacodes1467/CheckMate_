import { Link } from "react-router-dom";
import "./Pages.css";

const pieces = [
    {
        id: "king",
        name: "King",
        value: "Priceless",
        moves: "Moves one square in any direction. It can never move into check. If the king is trapped in check, the game is lost.",
    },
    {
        id: "queen",
        name: "Queen",
        value: "9 points",
        moves: "Moves any number of squares in a straight line: horizontally, vertically or diagonally.",
    },
    {
        id: "rook",
        name: "Rook",
        value: "5 points",
        moves: "Moves any number of squares horizontally or vertically.",
    },
    {
        id: "bishop",
        name: "Bishop",
        value: "3 points",
        moves: "Moves any number of squares diagonally, so it always stays on the same colour.",
    },
    {
        id: "knight",
        name: "Knight",
        value: "3 points",
        moves: "Moves in an 'L' shape: two squares one way and one square sideways. It is the only piece that can jump over others.",
    },
    {
        id: "pawn",
        name: "Pawn",
        value: "1 point",
        moves: "Moves forward one square (or two on its first move) and captures one square diagonally forward.",
    },
];

const specialRules = [
    {
        title: "Castling",
        text: "The king moves two squares towards a rook, and the rook jumps to the other side of the king. Allowed only if neither piece has moved, the squares between them are empty, and the king is not in, through, or into check. In CheckMate, move the king two squares to castle.",
    },
    {
        title: "En Passant",
        text: "If a pawn moves two squares forward and lands beside an enemy pawn, that enemy pawn may capture it as if it had moved only one square. This must be done immediately on the next move.",
    },
    {
        title: "Pawn Promotion",
        text: "When a pawn reaches the far end of the board it becomes a queen, rook, bishop or knight. CheckMate shows a menu so you can pick.",
    },
];

const endings = [
    { title: "Check", text: "The king is under attack. You must get out of check on your next move." },
    { title: "Checkmate", text: "The king is in check and there is no legal way to escape. The player who delivers checkmate wins." },
    { title: "Stalemate", text: "The player to move has no legal moves but is not in check. The game is a draw." },
    { title: "Other draws", text: "Insufficient material, threefold repetition of a position, or 50 moves without a capture or pawn move." },
];

function HowToPlay() {
    return (
        <div className="page">

            <header className="page-header">
                <span className="label">The rules</span>
                <h1>How to Play Chess</h1>
                <p>
                    Chess is played by two players on an 8×8 board. White always moves
                    first, and the goal is to checkmate the opponent's king.
                </p>
            </header>

            <section className="page-section">
                <h2>The pieces</h2>

                <div className="piece-grid">
                    {pieces.map((piece) => (
                        <div className="piece-card" key={piece.id}>
                            <div className="piece-images">
                                <img src={`/pieces/${piece.id}-w.svg`} alt={`White ${piece.name}`} />
                                <img src={`/pieces/${piece.id}-b.svg`} alt={`Black ${piece.name}`} />
                            </div>
                            <div>
                                <h3>
                                    {piece.name}
                                    <span className="piece-value">{piece.value}</span>
                                </h3>
                                <p>{piece.moves}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            <section className="page-section">
                <h2>Special moves</h2>

                <div className="rule-grid">
                    {specialRules.map((rule) => (
                        <div className="rule" key={rule.title}>
                            <h3>{rule.title}</h3>
                            <p>{rule.text}</p>
                        </div>
                    ))}
                </div>
            </section>

            <section className="page-section">
                <h2>How the game ends</h2>

                <div className="rule-grid">
                    {endings.map((rule) => (
                        <div className="rule" key={rule.title}>
                            <h3>{rule.title}</h3>
                            <p>{rule.text}</p>
                        </div>
                    ))}
                </div>
            </section>

            <section className="page-section">
                <h2>Using the CheckMate board</h2>

                <ul className="tips">
                    <li>Click a piece to select it. Small diamonds show the squares it can legally move to.</li>
                    <li>Click a highlighted square, or drag the piece there, to move.</li>
                    <li>Corner brackets around an enemy piece mean you can capture it.</li>
                    <li>The last move is shaded in brass, and a king in check gets a striped red frame.</li>
                    <li>Use Flip to view from Black's side, Undo to take back a move, and Restart to begin again.</li>
                </ul>

                <Link to="/play" className="btn btn-primary btn-large">
                    Try it now <span className="arrow">→</span>
                </Link>
            </section>

        </div>
    );
}

export default HowToPlay;
