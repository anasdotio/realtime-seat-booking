# Backend Server

This is a minimal Node.js server using **Socket.IO**.

## Prerequisites
- Node.js (v20 or later recommended)
- npm (comes with Node)

## Setup
```bash
cd backend
npm install          # installs socket.io
npm start            # starts the server on port 3000 (or $PORT)
```

The server will respond to HTTP requests with a plain text message, and it will accept Socket.IO connections.

### Socket.IO basics
- When a client connects, you will see a log like `A client connected: <socket-id>`.
- The server listens for a `message` event and echoes the payload back to the client.
- Disconnects are logged as well.

You can modify the server logic in `index.js` to handle custom events or integrate with your frontend.
