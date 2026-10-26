import Piece from "./Piece";

function Square({
    piece,
    x,
    y,
    isSelected,
    isLegalTarget,
    isLastMove,
    isInCheck,
    onClick,
    onDragStart,
    onDragOver,
    onDrop
}) {

    const isDark = (x + y) % 2 === 1;

    // Build the list of CSS classes for this square
    const classNames = [
        "square",
        isDark ? "dark" : "light",
        isSelected ? "selected" : "",
        isLastMove ? "last-move" : "",
        isInCheck ? "in-check" : "",
    ].join(" ");

    return (
        <div
            className={classNames}
            onClick={() => onClick(x, y)}
            onDragOver={onDragOver}
            onDrop={(e) => onDrop(e, x, y)}
        >

            {piece && (
                <div
                    className="piece-wrapper"
                    draggable
                    onDragStart={(e) => onDragStart(e, x, y)}
                >
                    <Piece piece={piece} />
                </div>
            )}

            {/* Legal move marker: a diamond on empty squares, corner brackets on captures */}
            {isLegalTarget && (
                <span className={piece ? "move-hint capture-hint" : "move-hint"} />
            )}

        </div>
    );
}

export default Square;
