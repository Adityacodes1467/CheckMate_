import { useState } from "react";
import ChessBoard from "./components/ChessBoard";
import GameInfo from "./components/GameInfo";
import MoveHistory from "./components/MoveHistory";
import CapturedPieces from "./components/CapturedPieces";
import { initialBoard } from "./data/initialBoard";
import "./App.css";

function App() {
  const [board, setBoard] = useState(initialBoard);
  const [selected, setSelected] = useState(null);
  const [turn, setTurn] = useState("White");
  const [moveCount, setMoveCount] = useState(0);
  const [moveHistory, setMoveHistory] = useState([]);
  const [capturedWhite, setCapturedWhite] = useState([]);
  const [capturedBlack, setCapturedBlack] = useState([]);
  const [isFlipped, setIsFlipped] = useState(false);

  // Select/Move using Click

  function handleSquareClick(x, y) {
    const piece = board[y][x];

    // If no piece is selected
    if (!selected) {
      if (piece === null) {
        return;
      }

      const isWhitePiece = piece.endsWith("-w");

      const isCorrectTurn =
        (turn === "White" && isWhitePiece) ||
        (turn === "Black" && !isWhitePiece);

      if (!isCorrectTurn) {
        alert(`It is ${turn}'s turn!`);
        return;
      }

      setSelected({
        x: x,
        y: y,
      });

      return;
    }

    // If a piece is already selected
    movePiece(selected.x, selected.y, x, y);
  }

  /* Move Piece :p */

  function movePiece(fromX, fromY, toX, toY) {
    const piece = board[fromY][fromX];

    if (!piece) {
      return;
    }

    // Check piece color
    const isWhitePiece = piece.endsWith("-w");

    // Check whose turn it is
    const isCorrectTurn =
      (turn === "White" && isWhitePiece) || (turn === "Black" && !isWhitePiece);

    if (!isCorrectTurn) {
      alert(`It is ${turn}'s turn!`);
      setSelected(null);
      return;
    }

    // X-Y direction
    const dx = toX - fromX;
    const dy = toY - fromY;

    const capturedPiece = board[toY][toX];

    if (capturedPiece) {
      if (capturedPiece.endsWith("-w")) {
        setCapturedWhite((previous) => [...previous, capturedPiece]);
      } else {
        setCapturedBlack((previous) => [...previous, capturedPiece]);
      }
    }

    const move = {
      piece: piece,
      fromX: fromX,
      fromY: fromY,
      toX: toX,
      toY: toY,
      dx: dx,
      dy: dy,
    };

    setMoveHistory((previousHistory) => [...previousHistory, move]);

    console.log("Piece:", piece);
    console.log("From X:", fromX);
    console.log("From Y:", fromY);
    console.log("To X:", toX);
    console.log("To Y:", toY);
    console.log("X direction:", dx);
    console.log("Y direction:", dy);

    // Copy the board
    const newBoard = board.map((row) => [...row]);

    // Move / capture
    newBoard[toY][toX] = piece;
    newBoard[fromY][fromX] = null;

    // Update board
    setBoard(newBoard);

    // Change turn
    setTurn((currentTurn) => (currentTurn === "White" ? "Black" : "White"));

    // Increase moves
    setMoveCount((currentCount) => currentCount + 1);

    // Clear selection
    setSelected(null);
  }

  /*Drag Start*/

  function handleDragStart(e, x, y) {
    const piece = board[y][x];

    if (!piece) {
      return;
    }

    const isWhitePiece = piece.endsWith("-w");

    const isCorrectTurn =
      (turn === "White" && isWhitePiece) || (turn === "Black" && !isWhitePiece);

    if (!isCorrectTurn) {
      e.preventDefault();
      alert(`It is ${turn}'s turn!`);
      return;
    }

    setSelected({
      x: x,
      y: y,
    });

    e.dataTransfer.setData("text/plain", `${x},${y}`);
  }
  // -----------------------------
  // ALLOW DROP
  // -----------------------------

  function handleDragOver(e) {
    e.preventDefault();
  }

  // -----------------------------
  // DROP PIECE
  // -----------------------------

  function handleDrop(e, toX, toY) {
    e.preventDefault();

    const data = e.dataTransfer.getData("text/plain");

    if (!data) {
      return;
    }

    const [fromX, fromY] = data.split(",").map(Number);

    movePiece(fromX, fromY, toX, toY);
  }

  // -----------------------------
  // RESTART
  // -----------------------------

  function restartGame() {
    setBoard(initialBoard.map((row) => [...row]));

    setSelected(null);

    setTurn("White");

    setMoveCount(0);

    setMoveHistory([]);

    setCapturedWhite([]);

    setCapturedBlack([]);
  }

  return (
    <div className="app">
      <GameInfo turn={turn} moveCount={moveCount} onRestart={restartGame} />

      <ChessBoard
        board={board}
        isFlipped={isFlipped}
        selected={selected}
        onSquareClick={handleSquareClick}
        onDragStart={handleDragStart}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
      />

      <div className="board-controls">
        <button onClick={() => setIsFlipped((current) => !current)}>
          🔄 Flip Board
        </button>
      </div>

      <MoveHistory moveHistory={moveHistory} />

      <CapturedPieces
        capturedWhite={capturedWhite}
        capturedBlack={capturedBlack}
      />
    </div>
  );
}

export default App;
