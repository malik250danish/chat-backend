// server.js
const express = require("express");
const http = require("http");
const socketIo = require("socket.io");

const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");
const authRoutes = require("./routes/auth");
const chatRoutes = require("./routes/chat");
const auth = require("./middleware/auth");
const Message = require("./models/Message");
const { getUserData } = require("./controllers/authController");

dotenv.config();
const app = express();
const server = http.createServer(app);
const io = socketIo(server);

connectDB();
app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/chat", auth, chatRoutes);
app.use("api/auth", auth, authRoutes);

io.on("connection", (socket) => {
  console.log("New client connected");

  socket.on("sendMessage", async ({ sender, receiver, content }) => {
    const message = new Message({ sender, receiver, content });
    await message.save();

    io.emit("receiveMessage", message);
  });

  socket.on("disconnect", () => {
    console.log("Client disconnected");
  });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
