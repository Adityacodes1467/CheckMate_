function GameOverModal({ status, moveCount, onNewGame, onClose }) {
    return (
        <div className="modal-backdrop" onClick={onClose}>

            <div className="modal" onClick={(e) => e.stopPropagation()}>

                <span className="modal-label">Result</span>

                <h2>{status.title}</h2>

                <p>{status.text}</p>

                <p className="modal-subtext">Game lasted {moveCount} moves.</p>

                <div className="modal-actions">
                    <button className="modal-btn primary" onClick={onNewGame}>
                        New game
                    </button>

                    <button className="modal-btn" onClick={onClose}>
                        View board
                    </button>
                </div>

            </div>

        </div>
    );
}

export default GameOverModal;
