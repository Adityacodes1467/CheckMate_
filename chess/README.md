# CheckMate — React Chess Website

CheckMate is a responsive, multi-page chess website built with React and Vite. It includes a chess game with legal-move validation and a Dashboard that demonstrates the React state-management topics in the Front End Engineering-II Evaluation 2 syllabus.

## Features

- Multi-page single-page application with React Router
- Home, Play, How to Play, About, Dashboard, and Not Found pages
- Legal chess moves powered by `chess.js`
- Check, checkmate, stalemate, castling, en passant, and pawn promotion
- Click-to-move and drag-and-drop
- Legal move hints, move history, captured pieces, material balance, undo, restart, and flip board
- Shared player profile with React Context API and browser `localStorage`
- Reusable profile form fields with validation and field-level errors
- Zustand store for asynchronous Dashboard data loading
- Loading, success, error, and retry states
- Responsive dark theme

## Requirements

- Node.js compatible with the installed Vite version
- npm

## Run locally

Open a terminal in the folder containing this README and `package.json`:

```bash
npm install
npm run dev
```

Open the local URL printed by Vite.

## Verify before evaluation

```bash
npm run build
npm run lint
```

## Rubric mapping

| Evaluation topic | CheckMate implementation |
|---|---|
| Navigation and page structure | React Router, shared Navbar/Footer, dedicated pages |
| Local state | Chess selection, board orientation, form values and modals |
| Context API/global state | `src/context/PlayerContext.jsx` shares the player profile between Navbar and Dashboard |
| Zustand | `src/store/dashboardStore.js` manages Dashboard data, loading and errors |
| Async state and error handling | Dashboard fetches `/dashboard-data.json` and provides retry behavior |
| Form handling and reusable inputs | `src/components/FormField.jsx` and validation in `src/pages/Dashboard.jsx` |
| Dashboard mini-project | `src/pages/Dashboard.jsx` combines profile editing and asynchronously loaded project data |
| Git and progress | Use meaningful commits and keep the remote repository synchronized |

## State architecture

- The chessboard keeps game-specific state local to `Play.jsx`.
- `PlayerContext` holds profile information used by multiple pages. It is persisted to `localStorage` on the current browser.
- Zustand manages the Dashboard data request. It exposes `overview`, `loading`, `error`, and `loadOverview`.
- `public/dashboard-data.json` is local demo data served by Vite. The asynchronous request does not require an external API key or backend.

## Deliberately test loading errors

The Dashboard displays loading and error states. To test the error UI without changing project source code, temporarily rename `public/dashboard-data.json`, refresh `/dashboard`, and click **Try again**. Restore the filename before finishing; then refresh and verify that the data loads.

## Suggested viva demonstration

1. Open Home and navigate to Play to show client-side routing.
2. Make a legal move and attempt an illegal move.
3. Open Dashboard and explain how the profile is provided by Context API.
4. Change the display name and email, first submit invalid values, then save valid values.
5. Point out that the navbar profile updates without prop drilling.
6. Refresh the Dashboard and show the async data, then explain Zustand's loading/error state and Retry button.

## Notes

This is a front-end project. The profile is stored only in the current browser; there is no server-side authentication or shared account database. The Dashboard JSON is project overview data, not fabricated game statistics.
