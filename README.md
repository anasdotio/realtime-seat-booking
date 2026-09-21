# WebSocket Seat Selection Demo

## Overview

This repository contains a simple **realtime-seat-booking
** built with:

- **Backend** – Node.js + Express + Socket.IO (listening on port 3000 by default).
- **Frontend** – React + TypeScript + Vite, using the Socket.IO client to communicate with the backend.

The app demonstrates how to:

- Establish a persistent WebSocket connection.
- Lock a seat when a user selects it and automatically release it after a timeout.
- Broadcast seat state changes to all connected clients in real time.

## Project Structure

```
/websocket
├─ backend/          # Express server with Socket.IO
│   ├─ index.js       # Server entry point
│   ├─ package.json   # Backend dependencies (express, socket.io)
│   └─ README.md      # Backend‑specific docs
├─ frontend/         # Vite‑powered React app
│   ├─ src/           # React source code (App, components, socket client)
│   ├─ package.json   # Frontend dependencies (react, socket.io-client)
│   └─ README.md      # Frontend‑specific docs
└─ README.md         # **This** top‑level overview
```

## Prerequisites

- **Node.js** (v20+ recommended) – includes npm.
- **npm** (or a compatible package manager such as `pnpm`/`yarn`).

## Getting Started

1. **Clone the repo** (if you haven't already):
   ```bash
   git clone <repo‑url>
   cd websocket
   ```
2. **Install backend dependencies**:
   ```bash
   cd backend
   npm install
   ```
3. **Run the backend**:
   ```bash
   npm start   # starts Express + Socket.IO on http://localhost:3000
   ```
4. **Install frontend dependencies** (in a new terminal window):
   ```bash
   cd ../frontend
   npm install   # or `pnpm install` if you prefer pnpm
   ```
5. **Run the frontend**:
   ```bash
   npm run dev   # launches Vite dev server, typically on http://localhost:5173
   ```
6. Open the frontend URL in a browser. You should see a list of seats you can select. When a seat is checked, it becomes locked for 30 seconds (shown by a countdown). All other connected browsers see the lock state instantly.

## How It Works

- **Backend (`backend/index.js`)** sets up an Express app with a single `GET /` route, then creates an HTTP server that Socket.IO attaches to. It listens for the following custom events:
  - `check:update` – received when a client selects/unselects a seat; the server broadcasts `check:updated` to all clients.
  - `seat:unlock` – emitted by the client (or timer) to release a seat; the server broadcasts `seat:unlocked`.
- **Frontend (`frontend/src/App.tsx`)** connects to the Socket.IO server, registers listeners for `check:updated` and `seat:unlocked`, and updates local React state accordingly. The `SeatLockTimer` component shows a countdown and automatically emits `seat:unlock` when the lock expires.

## Customisation

- **Port configuration** – Change the `PORT` environment variable for the backend or edit `backend/index.js`.
- **CORS origins** – The backend currently allows `http://localhost:5173`. Adjust the `cors` settings in `backend/index.js` if you serve the frontend from a different URL.
- **Lock duration** – Modify the `lockedExpiry` calculation in `frontend/src/App.tsx` to change how long a seat stays locked.

## License & Attribution

This demo is provided for educational purposes. Feel free to copy, modify, and extend it.

---

_Generated with the help of Claude Code_.
