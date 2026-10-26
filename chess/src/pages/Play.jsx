import { useMemo, useState } from "react";
import { Chess } from "chess.js";
import ChessBoard from "../components/ChessBoard";
import GameInfo from "../components/GameInfo";
import MoveHistory from "../components/MoveHistory";
import CapturedPieces from "../components/CapturedPieces";
import BoardControls from "../components/BoardControls";
import PromotionModal from "../components/PromotionModal";
import GameOverModal from "../components/GameOverModal";
import PlayerBar from "../components/PlayerBar";
import {
    toSquare,
    boardFromGame,
    findCheckedKing,
    getGameStatus,
    getCapturedPieces,
    getMaterialBalance,
} from "../utils/chessHelpers";
import "../App.css";

// Rebuild the engine position by replaying every move from the start.
// The move history is our single source of truth: board, turn, captures
// and game status are all derived from it, so they can never go out of sync.
function buildGame(history) {
    const game = new Chess();

    for (const move of history) {
        game.move({ from: move.from, to: move.to, promotion: move.promotion });
    }

    return game;
}

function Play() {
    // ---------- STATE ----------
    const [history, setHistory] = useState([]);              // moves played (chess.js move objects)
    const [selected, setSelected] = useState(null);          // { x, y } of the selected piece
    const [isFlipped, setIsFlipped] = useState(false);
    const [pendingPromotion, setPendingPromotion] = useState(null); // { from, to, color }
    const [showGameOver, setShowGameOver] = useState(true);
    const [message, setMessage] = useState("");

    // ---------- DERIVED VALUES (computed from state, not stored) ----------
    const game = useMemo(() => buildGame(history), [history]);

    const board = boardFromGame(game);
    const turn = game.turn() === "w" ? "White" : "Black";
    const status = getGameStatus(game);
    const checkSquare = findCheckedKing(game);
    const lastMove = history.length > 0 ? history[history.length - 1] : null;
    const { capturedWhite, capturedBlack } = getCapturedPieces(history);
    const materialBalance = getMaterialBalance(game);

    // Squares the selected piece is legally allowed to move to
    const legalTargets = new Set(
        selected
            ? game
                .moves({ square: toSquare(selected.x, selected.y), verbose: true })
                .map((move) => move.to)
            : []
    );

    // ---------- HELPERS ----------
    function isOwnPiece(x, y) {
        const piece = game.get(toSquare(x, y));
        return Boolean(piece) && piece.color === game.turn();
    }

    function canInteract() {
        return !status.isOver && !pendingPromotion;
    }

    // Ask the engine whether from -> to is legal, then play it
    function tryMove(from, to) {
        const candidates = game
            .moves({ square: from, verbose: true })
            .filter((move) => move.to === to);

        if (candidates.length === 0) {
            setMessage("That move is not legal.");
            setSelected(null);
            return;
        }

        // A pawn reaching the last rank has 4 possible moves (q, r, b, n),
        // so we ask the player which piece they want.
        if (candidates.some((move) => move.promotion)) {
            setPendingPromotion({ from, to, color: game.turn() });
            return;
        }

        commitMove(candidates[0]);
    }

    function commitMove(move) {
        setHistory((previous) => [...previous, move]);
        setSelected(null);
        setPendingPromotion(null);
        setShowGameOver(true);
        setMessage("");
    }

    // ---------- CLICK TO SELECT / MOVE ----------
    function handleSquareClick(x, y) {
        if (!canInteract()) {
            return;
        }

        // A piece is already selected
        if (selected) {
            // Clicking it again deselects it
            if (selected.x === x && selected.y === y) {
                setSelected(null);
                return;
            }

            // Clicking another of your own pieces switches the selection
            if (isOwnPiece(x, y)) {
                setSelected({ x, y });
                setMessage("");
                return;
            }

            tryMove(toSquare(selected.x, selected.y), toSquare(x, y));
            return;
        }

        // Nothing selected yet
        if (!game.get(toSquare(x, y))) {
            return;
        }

        if (!isOwnPiece(x, y)) {
            setMessage(`It is ${turn}'s turn!`);
            return;
        }

        setSelected({ x, y });
        setMessage("");
    }

    // ---------- DRAG AND DROP ----------
    function handleDragStart(e, x, y) {
        if (!canInteract() || !isOwnPiece(x, y)) {
            e.preventDefault();

            if (!status.isOver) {
                setMessage(`It is ${turn}'s turn!`);
            }
            return;
        }

        setSelected({ x, y });
        setMessage("");

        // Remember where the drag started
        e.dataTransfer.setData("text/plain", `${x},${y}`);
    }

    function handleDragOver(e) {
        // Allows the square to accept a drop
        e.preventDefault();
    }

    function handleDrop(e, toX, toY) {
        e.preventDefault();

        const data = e.dataTransfer.getData("text/plain");

        if (!data || !canInteract()) {
            return;
        }

        const [fromX, fromY] = data.split(",").map(Number);

        if (fromX === toX && fromY === toY) {
            return;
        }

        tryMove(toSquare(fromX, fromY), toSquare(toX, toY));
    }

    // ---------- PROMOTION ----------
    function handlePromotion(pieceType) {
        const { from, to } = pendingPromotion;

        const move = game
            .moves({ square: from, verbose: true })
            .find((m) => m.to === to && m.promotion === pieceType);

        commitMove(move);
    }

    function cancelPromotion() {
        setPendingPromotion(null);
        setSelected(null);
    }

    // ---------- CONTROLS ----------
    function undoMove() {
        setHistory((previous) => previous.slice(0, -1));
        setSelected(null);
        setPendingPromotion(null);
        setShowGameOver(true);
        setMessage("");
    }

    function restartGame() {
        setHistory([]);
        setSelected(null);
        setPendingPromotion(null);
        setShowGameOver(true);
        setMessage("");
    }

    // The player bar at the top of the board is the side facing away
    const topPlayer = isFlipped ? "White" : "Black";
    const bottomPlayer = isFlipped ? "Black" : "White";

    return (
        <div className="play-page">

            <div className="board-column">

                <PlayerBar color={topPlayer} isActive={!status.isOver && turn === topPlayer} />

                <ChessBoard
                    board={board}
                    isFlipped={isFlipped}
                    selected={selected}
                    legalTargets={legalTargets}
                    lastMove={lastMove}
                    checkSquare={checkSquare}
                    onSquareClick={handleSquareClick}
                    onDragStart={handleDragStart}
                    onDragOver={handleDragOver}
                    onDrop={handleDrop}
                />

                <PlayerBar color={bottomPlayer} isActive={!status.isOver && turn === bottomPlayer} />

            </div>

            <aside className="side-panel">

                <GameInfo
                    turn={turn}
                    moveCount={history.length}
                    status={status}
                />

                {message && <p className="game-message">{message}</p>}

                <BoardControls
                    onFlip={() => setIsFlipped((current) => !current)}
                    onUndo={undoMove}
                    onRestart={restartGame}
                    canUndo={history.length > 0}
                />

                <MoveHistory moveHistory={history} />

                <CapturedPieces
                    capturedWhite={capturedWhite}
                    capturedBlack={capturedBlack}
                    materialBalance={materialBalance}
                />

            </aside>

            {pendingPromotion && (
                <PromotionModal
                    color={pendingPromotion.color}
                    onSelect={handlePromotion}
                    onCancel={cancelPromotion}
                />
            )}

            {status.isOver && showGameOver && (
                <GameOverModal
                    status={status}
                    moveCount={history.length}
                    onNewGame={restartGame}
                    onClose={() => setShowGameOver(false)}
                />
            )}

        </div>
    );
}

export default Play;
