function MoveHistory({ moveHistory }) {

    return (
        <div className="move-history">
            <h2>Move History</h2>
            {moveHistory.length === 0 ? (
                <p>No moves yet</p>
            ) : (
                moveHistory.map((move, index) => (
                    <div
                        className="move"
                        key={index}
                    >
                        <strong>
                            {index + 1}.
                        </strong>
                        {" "}
                        {move.piece}
                        {" "}
                        ({move.fromX}, {move.fromY})
                        {" → "}
                        ({move.toX}, {move.toY})
                    </div>
                ))
            )}
        </div>
    );
}

export default MoveHistory;