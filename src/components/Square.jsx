import Piece from "./Piece";

function Square({
    piece,
    x,
    y,
    isSelected,
    onClick,
    onDragStart,
    onDragOver,
    onDrop
}) {

    const isDark = (x + y) % 2 === 1;

    return (
        <div
            className={`square ${isDark ? "dark" : "light"} ${
                isSelected ? "selected" : ""
            }`}
            onClick={() => onClick(x, y)}
            onDragOver={onDragOver}
            onDrop={(e) => onDrop(e, x, y)}
        >

            {piece && (
                <div
                    draggable
                    onDragStart={(e) => onDragStart(e, x, y)}
                >
                    <Piece piece={piece} />
                </div>
            )}

        </div>
    );
}

export default Square;