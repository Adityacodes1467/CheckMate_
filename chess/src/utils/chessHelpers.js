// Helpers that connect the chess.js engine to our React board.
//
// Our board uses matrix coordinates board[y][x]:
//   x = column 0-7 (left to right, files a-h)
//   y = row    0-7 (top to bottom, ranks 8-1)
// chess.js uses algebraic square names like "e2" or "e4".

const FILES = "abcdefgh";

// chess.js piece letters -> our piece names (used in /pieces/<name>-<color>.svg)
export const PIECE_NAMES = {
    p: "pawn",
    n: "knight",
    b: "bishop",
    r: "rook",
    q: "queen",
    k: "king",
};

// Standard material values, used for the "+3" advantage display
const PIECE_VALUES = { p: 1, n: 3, b: 3, r: 5, q: 9, k: 0 };

// (x, y) -> "e4"
export function toSquare(x, y) {
    return `${FILES[x]}${8 - y}`;
}

// "e4" -> { x, y }
export function toCoords(square) {
    return {
        x: FILES.indexOf(square[0]),
        y: 8 - Number(square[1]),
    };
}

// chess.js type + color ("n", "w") -> our identifier ("knight-w")
export function toPieceId(type, color) {
    return `${PIECE_NAMES[type]}-${color}`;
}

// Convert the engine's position into the same 8x8 matrix format as
// initialBoard.js, so ChessBoard / Square / Piece keep working unchanged.
export function boardFromGame(game) {
    return game.board().map((row) =>
        row.map((cell) => (cell ? toPieceId(cell.type, cell.color) : null))
    );
}

// Square name of the king that is currently in check (or null)
export function findCheckedKing(game) {
    if (!game.inCheck()) {
        return null;
    }

    for (const row of game.board()) {
        for (const cell of row) {
            if (cell && cell.type === "k" && cell.color === game.turn()) {
                return cell.square;
            }
        }
    }

    return null;
}

// Work out the game status message from the engine
export function getGameStatus(game) {
    const turn = game.turn() === "w" ? "White" : "Black";
    const opponent = turn === "White" ? "Black" : "White";

    if (game.isCheckmate()) {
        return {
            isOver: true,
            title: "Checkmate!",
            text: `${opponent} wins by checkmate.`,
        };
    }

    if (game.isStalemate()) {
        return {
            isOver: true,
            title: "Stalemate",
            text: `${turn} has no legal moves but is not in check. The game is a draw.`,
        };
    }

    if (game.isInsufficientMaterial()) {
        return {
            isOver: true,
            title: "Draw",
            text: "Neither side has enough pieces left to checkmate.",
        };
    }

    if (game.isThreefoldRepetition()) {
        return {
            isOver: true,
            title: "Draw",
            text: "The same position appeared three times (threefold repetition).",
        };
    }

    if (game.isDraw()) {
        return {
            isOver: true,
            title: "Draw",
            text: "50 moves passed without a capture or pawn move (50-move rule).",
        };
    }

    if (game.inCheck()) {
        return {
            isOver: false,
            inCheck: true,
            title: "Check!",
            text: `${turn} is in check and must get out of it.`,
        };
    }

    return {
        isOver: false,
        title: `${turn} to move`,
        text: "",
    };
}

// Build the captured-piece lists from the move history.
// capturedWhite = white pieces that Black has taken (and vice versa).
export function getCapturedPieces(history) {
    const capturedWhite = [];
    const capturedBlack = [];

    for (const move of history) {
        if (!move.captured) {
            continue;
        }

        // The captured piece always belongs to the side that did NOT move
        if (move.color === "w") {
            capturedBlack.push(toPieceId(move.captured, "b"));
        } else {
            capturedWhite.push(toPieceId(move.captured, "w"));
        }
    }

    return { capturedWhite, capturedBlack };
}

// Material score: positive = White ahead, negative = Black ahead.
// Counted from the pieces still on the board, so promotions are included.
export function getMaterialBalance(game) {
    let balance = 0;

    for (const row of game.board()) {
        for (const cell of row) {
            if (cell) {
                const value = PIECE_VALUES[cell.type];
                balance += cell.color === "w" ? value : -value;
            }
        }
    }

    return balance;
}
