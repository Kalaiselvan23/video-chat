import ws, { WebSocketServer } from "ws";
import WebSocket from "ws";
import express from "express";
import { Server } from "socket.io";
import bodyParser from "body-parser";
import authRouter from "./routes/auth";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();
const app = express();
const port = process.env.SERVER_PORT;
app.use(bodyParser.json());
app.use(cors());
app.use("/auth", authRouter);
const server = app.listen(port, () => {
  console.log(`Listening in port ${port}`);
});
const wss = new WebSocketServer({ server: server });
const users = new Map();
const rooms = new Map();
wss.on("connection", (ws) => {
  const userId = `user-${Math.random().toString(36).substring(2, 15)}`;
  users.set(userId, ws);
  ws.on("error", console.error);
  console.log(users);
  ws.on("message", (data, isBinary) => {
    const message = JSON.parse(data.toString());
    if ((message.type = "create")) {
      const userId = message.userId;
      const roomId = `room-${Math.random().toString(36).substring(2, 15)}`;
      rooms.set(roomId, new Set());
      rooms.get(roomId).add(userId);
      ws.send(
        JSON.stringify({
          type: "info",
          message: `Room created with ID ${roomId} and you were joined`,
        })
      );
    } else if (message.type == "join") {
      const roomId = message.roomId;
      const userId = message.userId;
      if (!rooms.has(roomId)) {
        JSON.stringify({ type: "error", message: "No room in this roomId" });
      }
      rooms.get(roomId).add(userId);
      ws.send(
        JSON.stringify({ type: "info", message: `Joined room ${roomId}` })
      );
    } else if (message.type == "message") {
      const roomId = message.roomId;
      if (rooms.has(roomId)) {
        users.forEach((uuid) => {
          const client = users.get(uuid);
          if (client && client.readyState === WebSocket.OPEN) {
            client.send(
              JSON.stringify({
                type: "message",
                message: message.content,
              }),
              { binary: isBinary }
            );
          }
        });
      }
    }
  });
  ws.on("close", () => {
    console.log(`Connection closed: ${userId}`);
    users.delete(userId);

    rooms.forEach((roomUsers, roomId) => {
      if (roomUsers.has(userId)) {
        roomUsers.delete(userId);
        if (roomUsers.size === 0) {
          rooms.delete(roomId);
        }
      }
    });
  });
  ws.send(
    JSON.stringify({
      type: "info",
      message: `Hello from backend server. Your ID is ${userId}`,
    })
  );
});
