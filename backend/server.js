const express = require("express");
const connectDB = require("./config/db");
const dotenv = require("dotenv");
// const {chats}= require("./data/data");

const usesrRoutes = require("./routes/userRoutes");
const chatRoutes = require("./routes/chatRoutes");
const messageRoutes = require("./routes/messageRoutes");
const socket = require("./config/socket");

// const colors=require("colors");
const { notFound, errorHandler } = require("./middleware/errorMiddleware");
// const { Socket } = require("socket.io");

dotenv.config();
connectDB();

const app = express();
app.use(express.json());

app.use("/api/user", usesrRoutes);
app.use("/api/chat", chatRoutes);
app.use("/api/message", messageRoutes);


//////////////////////////////////////////////////////

const path = require("path");

const __dirname1 = path.resolve();

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname1, "/frontend/build")));

  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname1, "frontend", "build", "index.html"))
  );
} else {
  app.get("/", (req, res) => {
    res.send("API is running..");
  });
}

//////////////////////////////////////////////////////

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, console.log(`server started on PORT ${PORT}`));

socket(server);
