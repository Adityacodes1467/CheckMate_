// The label above/below the board showing which side sits there
function PlayerBar({ color, isActive }) {
    return (
        <div className={`player-bar ${isActive ? "active" : ""}`}>

            <span className={`player-swatch ${color.toLowerCase()}`} />

            <span className="player-name">{color}</span>

            {isActive && <span className="player-turn">to move</span>}

        </div>
    );
}

export default PlayerBar;
