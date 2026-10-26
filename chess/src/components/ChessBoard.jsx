import Square from "./Square";
import { toSquare } from "../utils/chessHelpers";

const FILES = "abcdefgh".split("");
const RANKS = ["8", "7", "6", "5", "4", "3", "2", "1"];

function ChessBoard({
    board,
    isFlipped,
    selected,
    legalTargets,
    lastMove,
    checkSquare,
    onSquareClick,
    onDragStart,
    onDragOver,
    onDrop
}) {
    // Coordinate labels drawn outside the board, reversed when flipped
    const ranks = isFlipped ? [...RANKS].reverse() : RANKS;
    const files = isFlipped ? [...FILES].reverse() : FILES;

    return (
        <div className="board-frame">

            <div className="board-ranks" aria-hidden="true">
                {ranks.map((rank) => <span key={rank}>{rank}</span>)}
            </div>

            <div className="chess-board">

                {Array.from({ length: 8 }, (_, displayY) => {

                    // Flipping only changes which square is drawn where;
                    // the board matrix itself never changes.
                    const y = isFlipped
                        ? 7 - displayY
                        : displayY;

                    return Array.from(
                        { length: 8 },
                        (_, displayX) => {

                            const x = isFlipped
                                ? 7 - displayX
                                : displayX;

                            const piece = board[y][x];
                            const square = toSquare(x, y);

                            return (
                                <Square
                                    key={square}
                                    piece={piece}
                                    x={x}
                                    y={y}
                                    isSelected={
                                        selected &&
                                        selected.x === x &&
                                        selected.y === y
                                    }
                                    isLegalTarget={legalTargets.has(square)}
                                    isLastMove={
                                        lastMove &&
                                        (lastMove.from === square || lastMove.to === square)
                                    }
                                    isInCheck={checkSquare === square}
                                    onClick={onSquareClick}
                                    onDragStart={onDragStart}
                                    onDragOver={onDragOver}
                                    onDrop={onDrop}
                                />
                            );
                        }
                    );
                })}

            </div>

            <div className="board-files" aria-hidden="true">
                {files.map((file) => <span key={file}>{file}</span>)}
            </div>

        </div>
    );
}

export default ChessBoard;
