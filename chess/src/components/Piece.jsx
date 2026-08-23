function Piece({ piece }) {

    if (!piece) {
        return null;
    }

    const [name, color] = piece.split("-");

    return (
        <img
            src={`/pieces/${name}-${color}.svg`}
            alt={piece}
            className="chess-piece"
            draggable="false"
        />
    );
}

export default Piece;