const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3000;

// Use CORS middleware
app.use(
  cors({
    origin: "http://localhost:5173", // Adjust this to your frontend URL
  }),
);

// Basic route
app.get("/", (req, res) => {
  res.send("Socket.IO server is running");
});

// Create an HTTP server using the Express app
const server = http.createServer(app);

// Attach Socket.IO to the server
const io = new Server(server, {
  // options can be added here
  cors: {
    origin: ["http://localhost:5173"], // Adjust this to your frontend URL
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log("A client connected:", socket.id);

  // Example event handler: echo messages back to the client
  socket.on("message", (data) => {
    console.log("Received message:", data);
    socket.emit("message", data);
  });

  socket.emit("welcome", "Welcome to the Socket.IO server!");

  socket.on("check:update", (data) => {
    console.log("Received check:update from client:", data);
    io.emit("check:updated", data); // Broadcast to all connected clients
  });

  socket.on("seat:unlock", (data) => {
    console.log("Received seat:unlock from client:", data);
    io.emit("seat:unlocked", data); // Broadcast to all connected clients
  });

  socket.on("disconnect", () => {
    console.log("Client disconnected:", socket.id);
  });
});

server.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});
