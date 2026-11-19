import { PIECE_NAMES } from "../utils/chessHelpers";

// Shown when a pawn reaches the last rank. The player picks the new piece.
function PromotionModal({ color, onSelect, onCancel }) {

    const choices = ["q", "r", "b", "n"];

    return (
        <div className="modal-backdrop" onClick={onCancel}>

            <div className="modal" onClick={(e) => e.stopPropagation()}>

                <span className="modal-label">Promotion</span>

                <h2>Choose a new piece</h2>

                <div className="promotion-choices">
                    {choices.map((type) => (
                        <button
                            key={type}
                            className="promotion-choice"
                            onClick={() => onSelect(type)}
                            title={PIECE_NAMES[type]}
                        >
                            <img
                                src={`/pieces/${PIECE_NAMES[type]}-${color}.svg`}
                                alt={PIECE_NAMES[type]}
                            />
                            <span>{PIECE_NAMES[type]}</span>
                        </button>
                    ))}
                </div>

                <button className="modal-btn" onClick={onCancel}>
                    Cancel
                </button>

            </div>

        </div>
    );
}

export default PromotionModal;
