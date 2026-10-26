// Always draw at least this many ruled lines, like a paper scoresheet
const MIN_ROWS = 8;

function MoveHistory({ moveHistory }) {

    // Group moves into pairs: 1. e4 e5   2. Nf3 Nc6 ...
    const rows = [];

    for (let i = 0; i < moveHistory.length; i += 2) {
        rows.push({
            number: i / 2 + 1,
            white: moveHistory[i],
            black: moveHistory[i + 1],
        });
    }

    // Empty lines to fill up the sheet
    const blankRows = Math.max(0, MIN_ROWS - rows.length);

    const lastIndex = moveHistory.length - 1;

    return (
        <div className="move-history">

            <div className="sheet-header">
                <h2>Scoresheet</h2>
                <span>CheckMate</span>
            </div>

            <div className="move-list">

                <div className="move sheet-columns">
                    <span>No.</span>
                    <span>White</span>
                    <span>Black</span>
                </div>

                {rows.map((row, rowIndex) => (
                    <div className="move" key={row.number}>

                        <span className="move-number">{row.number}</span>

                        <span
                            className={`move-san ${rowIndex * 2 === lastIndex ? "latest" : ""}`}
                        >
                            {row.white.san}
                        </span>

                        <span
                            className={`move-san ${rowIndex * 2 + 1 === lastIndex ? "latest" : ""}`}
                        >
                            {row.black ? row.black.san : ""}
                        </span>

                    </div>
                ))}

                {Array.from({ length: blankRows }, (_, i) => (
                    <div className="move blank" key={`blank-${i}`}>
                        <span className="move-number">{rows.length + i + 1}</span>
                        <span />
                        <span />
                    </div>
                ))}

            </div>

        </div>
    );
}

export default MoveHistory;
