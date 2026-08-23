import { useState } from "react";

import ChessBoard from "./components/ChessBoard";

import { initialBoard } from "./data/initialBoard";

import "./App.css";


function App() {

    const [board, setBoard] = useState(
        initialBoard.map(row => [...row])
    );

    const [selected, setSelected] = useState(null);


    function handleSquareClick(x, y) {

        console.log("Clicked:", x, y);

        setSelected({
            x: x,
            y: y
        });
    }


    function handleDragStart(e, x, y) {

        console.log("Drag started:", x, y);

    }


    function handleDragOver(e) {

        e.preventDefault();

    }


    function handleDrop(e, x, y) {

        e.preventDefault();

        console.log("Dropped:", x, y);

    }


    return (
        <div className="app">

            <ChessBoard
                board={board}

                selected={selected}

                onSquareClick={handleSquareClick}

                onDragStart={handleDragStart}

                onDragOver={handleDragOver}

                onDrop={handleDrop}
            />

        </div>
    );
}

export default App;
