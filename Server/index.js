import dotenv from "dotenv";
import path from "path";
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import http from "http";
import { Server } from "socket.io";
import { fileURLToPath } from "url";

// Load env FIRST
dotenv.config();

// Fix __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ✅ CREATE APP FIRST
const app = express();

// ======================
// ✅ MIDDLEWARE
// ======================
app.use(cors({
  origin: "*",
  credentials: true,
}));

app.use(express.json({ limit: "30mb" }));
app.use(express.urlencoded({ limit: "30mb", extended: true }));

// ======================
// ✅ ROUTES IMPORT
// ======================
import AuthRoute from "./Routes/AuthRoute.js";
import UserRoute from "./Routes/UserRoute.js";
import PostRoute from "./Routes/PostRoute.js";
import UploadRoute from "./Routes/UploadRoute.js";
import MessageRoute from "./Routes/MessageRoute.js";
import ChatRoute from "./Routes/ChatRoute.js";

// ======================
// ✅ ROUTES USE
// ======================
app.use("/auth", AuthRoute);
app.use("/user", UserRoute);
app.use("/post", PostRoute);
app.use("/upload", UploadRoute);
app.use("/message", MessageRoute);
app.use("/chat", ChatRoute);

// ======================
// ✅ STATIC FILES
// ======================
app.use("/public", express.static(path.join(__dirname, "public")));

// ======================
// ✅ TEST ROUTE
// ======================
app.get("/", (req, res) => {
  res.json({ message: "Backend is running 🚀" });
});

// ======================
// ✅ SOCKET.IO
// ======================
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  socket.on("joinRoom", (roomId) => socket.join(roomId));

  socket.on("sendMessage", ({ roomId, message }) => {
    io.to(roomId).emit("receiveMessage", message);
  });

  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
  });
});

// ======================
// ✅ DATABASE + SERVER
// ======================
const PORT = process.env.PORT || 5000;

console.log("Starting server...");

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected ✅");

    server.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("MongoDB error ❌", error);
  });
  app.get("/test", (req, res) => {
  res.send("TEST WORKING ✅");
});