function GameInfo({ turn, moveCount, status }) {

    const statusClass = status.isOver
        ? "game-info over"
        : status.inCheck
            ? "game-info check"
            : "game-info";

    return (
        <div className={statusClass}>

            <span className="label">Game status</span>

            <h2 className="status-title">{status.title}</h2>

            {status.text && <p className="status-text">{status.text}</p>}

            <div className="status">
                <span>Turn <strong>{turn}</strong></span>
                <span>Moves <strong>{moveCount}</strong></span>
            </div>

        </div>
    );
}

export default GameInfo;
