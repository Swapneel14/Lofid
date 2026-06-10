const express = require("express");

const http = require("http");
const mongoose = require("mongoose");
const cors = require("cors");
const { Server } = require("socket.io");
const { connectDB } = require("./config/db");
require("dotenv").config();
const Message = require('./models/Message.js');
const messageRoutes =
  require("./routes/messageRoutes");





const app = express();

app.use(cors());
app.use(express.json());

app.use(
  "/api/messages",
  messageRoutes
);

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

io.on('connection', (socket) => {
  console.log("User Connected:-", socket.id);

  socket.on('join-room', (data) => {
      if (!data?.roomId) return;
    socket.join(data.roomId);
    console.log(
    `${data.userName} joined room ${data.roomId}`
  );

    socket.to(data.roomId).emit('user-joined', {
      userName: data.userName,
      roomId: data.roomId,
    })

  })

  socket.on("send-message", async (data) => {
  try {

    const savedMessage = await Message.create({
      roomId: data.roomId,
      senderId: data.senderId,
      senderName: data.senderName,
      message: data.message,
    });

    io.to(data.roomId).emit(
      "receive-message",
      savedMessage
    );

  } catch (err) {

    console.error(
      "Message save error:",
      err
    );

  }
});

  socket.on("leave-room", (data) => {

    socket.leave(data.roomId);

    socket.to(data.roomId).emit("user-left", {
      userName: data.userName,
      roomId: data.roomId,
    });

  });

  socket.on('disconnect', () => {
    console.log("User Disconnected", socket.id);
  })
})

async function startServer() {
  try {
    // Connect MongoDB first
    await connectDB();

    // Start server only after DB connection succeeds
    server.listen(process.env.PORT || 5000, () => {
      console.log(
        `Server running on port ${process.env.PORT || 5000}`
      );
    });
  } catch (err) {
    console.error("Failed to start server:", err);
    process.exit(1);
  }
}

startServer();