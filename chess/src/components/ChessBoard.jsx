import Square from "./Square";

function ChessBoard({
    board,
    selected,
    onSquareClick,
    onDragStart,
    onDragOver,
    onDrop
}) {
    return (
        <div className="chess-board">

            {board.map((row, y) =>
                row.map((piece, x) => (
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
                ))
            )}

        </div>
    );
}

export default ChessBoard;