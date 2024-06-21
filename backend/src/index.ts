import ws, { WebSocketServer } from "ws";
import WebSocket from "ws";
import express from "express";
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
  console.log(`Listening on port ${port}`);
});
const wss = new WebSocketServer({ server: server });
const users = new Map();
const rooms = new Map();
let senderSocket: WebSocket | null = null;
let recieverSocket: WebSocket | null = null;

wss.on("connection", (ws) => {
  const userId = `user-${Math.random().toString(36).substring(2, 15)}`;
  users.set(userId, ws);

  ws.on("error", console.error);

  ws.on("message", (data) => {
    const message = JSON.parse(data.toString());

    if (message.type === "create") {
      const roomId = `room-${Math.random().toString(36).substring(2, 15)}`;
      rooms.set(roomId, new Set());
      rooms.get(roomId).add(userId);
      console.log(`Room created with ID ${roomId} and user ${userId} joined`);
      senderSocket = ws;
      ws.send(
        JSON.stringify({
          type: "create-response",
          roomId: roomId,
          message: `Room created with ID ${roomId} and you were joined`,
        })
      );
    } else if (message.type === "join") {
      const roomId = message.roomId;
      if (!rooms.has(roomId)) {
        ws.send(
          JSON.stringify({
            type: "error",
            message: "No room with this roomId exists",
          })
        );
      } else {
        rooms.get(roomId).add(userId);
        recieverSocket = ws;
        console.log(`User ${userId} joined room ${roomId}`);
        ws.send(
          JSON.stringify({
            type: "join-response",
            message: `Joined room ${roomId}`,
            roomId: roomId,
          })
        );
      }
    } else if (message.type === "message") {
      const roomId = message.roomId;
      if (rooms.has(roomId)) {
        users.forEach((client, uuid) => {
          if (client !== ws && client.readyState === WebSocket.OPEN) {
            client.send(
              JSON.stringify({
                type: "message",
                message: message.content,
              })
            );
          }
        });
      }
    } else if (message.type === "fetchUsers") {
      const roomId = message.roomId;
      if (rooms.has(roomId)) {
        users.forEach((client, uuid) => {
          client.send(
            JSON.stringify({
              type: "roomUsers-response",
              users: Array.from(rooms.get(roomId)),
            })
          );
        });
        // const roomUsers = Array.from(rooms.get(roomId));
        // console.log(roomUsers)
        // ws.send(
        //   JSON.stringify({
        //     type: "roomUsers-response",
        //     users: roomUsers,
        //   })
        // );
        // wss.clients.forEach((client) => {});
      } else {
        ws.send(
          JSON.stringify({
            type: "room-error",
            msg: "room not found",
          })
        );
      }
    } else if (message.type === "createOffer") {
      if (ws !== senderSocket) {
        return;
      }
      recieverSocket?.send(
        JSON.stringify({ type: "createOffer", sdp: message.sdp })
      );
    } else if (message.type === "createAnswer") {
      if (ws !== recieverSocket) {
        return;
      }
      senderSocket?.send(
        JSON.stringify({ type: "createAnswer", sdp: message.sdp })
      );
    } else if (message.type === "iceCandidate") {
      if (ws === senderSocket) {
        recieverSocket?.send(
          JSON.stringify({ type: "iceCandidate", candidate: message.candidate })
        );
      } else if (ws === recieverSocket) {
        senderSocket?.send(
          JSON.stringify({ type: "iceCandidate", candidate: message.candidate })
        );
      }
    }
  });

  ws.on('close', () => {
    const userRoomId = users.get(userId).roomId;
    if (userRoomId && rooms.get(userRoomId)) {
        rooms.get(userRoomId).users = rooms.get(userRoomId).users.filter((uid:any) => uid !== userId);
        if (rooms.get(userRoomId).users.length === 0) {
            rooms.delete(userRoomId);
        } else {
            broadCastUserList(userRoomId);
        }
    }
     users.delete(userId);
});

  ws.send(
    JSON.stringify({
      type: "id-info",
      userId,
      message: `Hello from the backend server. Your ID is ${userId}`,
    })
  );
});

const broadCastUserList = (roomId: string) => {
  if (rooms.get(roomId)) {
    users.forEach((client, uuid) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(
          JSON.stringify({
            type: "roomUsers-response",
            users: Array.from(rooms.get(roomId)),
          })
        );
      }
    });
  }
};
