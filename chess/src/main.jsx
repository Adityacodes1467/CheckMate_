import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { PlayerProvider } from "./context/PlayerContext";
import "./index.css";
import App from "./App.jsx";

// BrowserRouter provides client-side page routing. PlayerProvider exposes
// the same profile to the navbar and Dashboard without prop drilling.
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <PlayerProvider>
        <App />
      </PlayerProvider>
    </BrowserRouter>
  </StrictMode>,
);
