function GameInfo({ turn, moveCount, onRestart }) {

    return (
        <div className="game-info">

            <h1>♟ Chess Arena</h1>

            <div className="status">

                <p>
                    Turn:
                    <strong>{turn}</strong>
                </p>

                <p>
                    Moves:
                    <strong>{moveCount}</strong>
                </p>

            </div>

            <button onClick={onRestart}>
                Restart Game
            </button>

        </div>
    );
}

export default GameInfo;