import Square from "./Square";

function ChessBoard({
    board,
    isFlipped,
    selected,
    onSquareClick,
    onDragStart,
    onDragOver,
    onDrop
}) {
    return (
        <div className="chess-board">

            {Array.from({ length: 8 }, (_, displayY) => {

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

                        return (
                            <Square
                                key={`${x}-${y}`}
                                piece={piece}
                                x={x}
                                y={y}
                                isSelected={
                                    selected &&
                                    selected.x === x &&
                                    selected.y === y
                                }
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
    );
}

export default ChessBoard;