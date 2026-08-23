function CapturedPieces({
    capturedWhite,
    capturedBlack
}) {
    return (
        <div className="captured-pieces">

            <h2>Captured Pieces</h2>

            <div className="captured-section">

                <h3>White</h3>

                <div className="captured-list">

                    {capturedWhite.length === 0 ? (
                        <p>None</p>
                    ) : (
                        capturedWhite.map((piece, index) => (
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

            <div className="captured-section">

                <h3>Black</h3>

                <div className="captured-list">

                    {capturedBlack.length === 0 ? (
                        <p>None</p>
                    ) : (
                        capturedBlack.map((piece, index) => (
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

        </div>
    );
}

export default CapturedPieces;