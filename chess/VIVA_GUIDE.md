# CheckMate Evaluation 2 — Viva Quick Guide

## 1. Explain your project in 30 seconds

“CheckMate is a React single-page chess website built using Vite, React Router, and chess.js. The chess page uses chess.js to validate legal moves and determine game status. The Dashboard demonstrates React Context for shared player information, Zustand for asynchronous data state, and a reusable form with validation. The website also includes loading and error handling.”

## 2. Likely questions and answers

**What is an SPA?**  
A Single-Page Application changes the view on the client without reloading the entire document. React Router maps the URL to a page component.

**What is the difference between state and props?**  
State is data a component or store owns and updates. Props are values passed from a parent component to a child.

**What is local state?**  
State used by a component or a small part of the interface, such as the selected square on the chessboard or values currently typed into a form.

**What is global state?**  
State needed by unrelated components or multiple pages. The player profile is a good example because both Navbar and Dashboard use it.

**Why use Context API?**  
Context lets components consume a shared value without passing the same props through every intermediate component. `PlayerProvider` provides the profile and `usePlayer` reads it.

**What is prop drilling?**  
Passing props through components that do not need them only so a deeper descendant can access them. Context can avoid this for shared values.

**Why use Zustand?**  
Zustand is a small external store. Components subscribe to the state slices they use; here it manages Dashboard data, loading, and errors.

**Why not use Context for everything?**  
State should live where it is needed. Chess selection and modals are local to the Play page; the profile is shared; Dashboard request state is in Zustand.

**What is asynchronous state management?**  
A request may take time to complete. The interface tracks loading, success data, and error so the user gets feedback instead of an empty or frozen page.

**Where does Dashboard data come from?**  
The store uses `fetch('/dashboard-data.json')` to load a local public JSON file asynchronously. This keeps the example independent of an external API.

**How is error handling demonstrated?**  
The store checks `response.ok`, catches failures, sets an error string, and the page displays it with a Try again button.

**What is a controlled input?**  
An input whose displayed value is driven by React state through `value`, and whose changes update state through `onChange`.

**How does form validation work?**  
On submission, the handler validates the name and email, stores any errors, and stops the save if errors exist. With valid values, it updates the shared profile.

**Why is FormField reusable?**  
It centralizes label, input, accessibility attributes, and error display so several form fields share one consistent implementation.

**What is localStorage?**  
Browser storage that persists small strings across refreshes in the same browser. This project saves a profile locally; it is not account authentication or cloud storage.

**What is chess.js responsible for?**  
It validates legal chess moves and detects game states such as check, checkmate, stalemate and special-move rules. React renders the board and interface.

**Why derive the board from move history?**  
The game is rebuilt by replaying moves through chess.js. This creates a single source of truth and keeps the board, turn, captures, and status consistent with the engine.

**What is Git used for?**  
Version control: tracking source changes, creating checkpoints, collaborating through branches, and synchronizing with the remote GitHub repository.

## 3. Five-minute demonstration order

1. Home page and route navigation.
2. Play page: make e2–e4; show legal move enforcement and move history.
3. Dashboard: show the project overview loading and then rendering.
4. Submit a blank profile and explain validation errors.
5. Enter a valid display name/email and save; show the navbar update.
6. Refresh the page and explain localStorage persistence.
7. Explain Context API, Zustand, and how loading/error/retry are implemented.

## 4. Honest limitations to state if asked

- This version does not implement login or server-backed accounts.
- The profile belongs to the current browser through localStorage.
- Dashboard overview comes from a bundled JSON file rather than a remote API.
- Stockfish/AI and online multiplayer are not included in this evaluation version.
