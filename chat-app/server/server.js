import express from "express";
import "dotenv/config";
import cors from "cors";
import http from "http";
import { connectDB } from "./lib/db.js";
import userRouter from "./Routes/userRoutes.js";
import messageRouter from "./Routes/messageRoutes.js";
import { Server } from "socket.io";

//Create express app and HTTP server
const app = express();
const server = http.createServer(app);

//initialize socket.io server
export const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

// store online users
export const userSocketMap = {}; // {userId: socketId}

// socket.io connection handeler
io.on("connection", (socket) => {
  const userId = socket.handshake.query.userId;
  console.log(`User connected: ${userId}`);

  if (userId) userSocketMap[userId] = socket.id;

  //Emit online users to all connected clients
  io.emit("getOnlineUsers", Object.keys(userSocketMap));

  //disconnect event
  socket.on("disconnect", () => {
    console.log(`User disconnected: ${userId}`);
    delete userSocketMap[userId];
    io.emit("getOnlineUsers", Object.keys(userSocketMap));
  });
});

// Middleware setup
app.use(express.json({ limit: "4mb" }));
app.use(cors());

// Routes setup
app.use("/api/status", (req, res) => res.send("Server is live"));
app.use("/api/auth", userRouter);
app.use("/api/messages", messageRouter);

// connect to MongoDB
await connectDB();

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
