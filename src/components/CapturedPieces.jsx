function CapturedList({ title, pieces, advantage }) {
    return (
        <div className="captured-section">

            <h3>
                {title}
                {advantage > 0 && <span className="advantage">+{advantage}</span>}
            </h3>

            <div className="captured-list">

                {pieces.length === 0 ? (
                    <p>—</p>
                ) : (
                    pieces.map((piece, index) => (
                        <img
                            key={`${piece}-${index}`}
                            src={`/pieces/${piece}.svg`}
                            alt={piece}
                            className="captured-piece"
                        />
                    ))
                )}

            </div>

        </div>
    );
}

function CapturedPieces({ capturedWhite, capturedBlack, materialBalance }) {

    return (
        <div className="captured-pieces">

            <span className="label">Captured</span>

            {/* White's captures are black pieces, and vice versa */}
            <CapturedList
                title="By White"
                pieces={capturedBlack}
                advantage={materialBalance}
            />

            <CapturedList
                title="By Black"
                pieces={capturedWhite}
                advantage={-materialBalance}
            />

        </div>
    );
}

export default CapturedPieces;
