function BoardControls({ onFlip, onUndo, onRestart, canUndo }) {
    return (
        <div className="board-controls">

            <button onClick={onFlip}>
                ⇅ Flip
            </button>

            <button onClick={onUndo} disabled={!canUndo}>
                ↶ Undo
            </button>

            <button className="danger" onClick={onRestart}>
                ⟲ Restart
            </button>

        </div>
    );
}

export default BoardControls;
