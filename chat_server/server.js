const express = require("express");
const dns = require("dns");

const http = require("http");
const mongoose = require("mongoose");
const cors = require("cors");
const { Server } = require("socket.io");
const { connectDB } = require("./config/db");
require("dotenv").config();
const Message = require('./models/Message.js');
const messageRoutes =
  require("./routes/messageRoutes");
const BannedUser = require("./models/BannedUser.js");

dns.setServers(["1.1.1.1", "0.0.0.0"]);





const app = express();

app.use(cors());
app.use(express.json());

app.use(
  "/api/messages",
  messageRoutes
);

app.get("/", (req, res) => {
  res.status(200).send("Chat Server is Running 🚀");
});

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

  // socket.on("send-message", async (data) => {
  //   try {

  //     const savedMessage = await Message.create({
  //       roomId: data.roomId,
  //       senderId: data.senderId,
  //       senderName: data.senderName,
  //       message: data.message,
  //     });

  //     io.to(data.roomId).emit(
  //       "receive-message",
  //       savedMessage
  //     );

  //   } catch (err) {

  //     console.error(
  //       "Message save error:",
  //       err
  //     );

  //   }
  // });

  socket.on("send-message", async (data) => {
    try {
      // 1. Check if the user is banned
      const bannedRecord = await BannedUser.findOne({ userId: data.senderId });

      if (bannedRecord) {
        if (new Date() < new Date(bannedRecord.expiredAt)) {
          // 2. Reject the message! Send an error back ONLY to this user
          socket.emit("system-error", {
            message: "You have been restricted from sending messages."
          });
          return; // STOP execution. Do not broadcast or save.
        } else {
          await BannedUser.findByIdAndDelete(bannedRecord._id); // Auto-unban if time expired
        }
      }

      // 3. If not banned, broadcast the message as normal...
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
    } catch (error) {
      console.error("Socket error:", error);
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