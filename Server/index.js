import dotenv from "dotenv";
import path from "path";
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import http from "http";
import { Server } from "socket.io";
import { fileURLToPath } from "url";

// Routes
import AuthRoute from "./Routes/AuthRoute.js";
import UserRoute from "./Routes/UserRoute.js";
import PostRoute from "./Routes/PostRoute.js";
import UploadRoute from "./Routes/UploadRoute.js";

// Load env
dotenv.config();

// Fix __dirname (ES modules)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// ======================
// ✅ MIDDLEWARE
// ======================
app.use(
  cors({
    origin: "*", // ⚠️ restrict in production if needed
    credentials: true,
  })
);

app.use(express.json({ limit: "30mb" }));
app.use(express.urlencoded({ limit: "30mb", extended: true }));

// ======================
// ✅ STATIC FILES (FIXED)
// ======================
app.use("/public", express.static(path.join(__dirname, "public")));

// ======================
// ✅ ROUTES
// ======================
app.use("/auth", AuthRoute);
app.use("/user", UserRoute);
app.use("/post", PostRoute);
app.use("/upload", UploadRoute);

// ======================
// ✅ HEALTH CHECK
// ======================
app.get("/", (req, res) => {
  res.json({
    status: "success",
    message: "Backend is running 🚀",
  });
});

// ======================
// ✅ DEBUG IMAGES (OPTIONAL)
// ======================
app.get("/test-images", async (req, res) => {
  try {
    const fs = await import("fs");
    const files = fs.readdirSync(
      path.join(__dirname, "public/images")
    );
    res.json(files);
  } catch (err) {
    res.status(500).json({ error: "Cannot read images folder" });
  }
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

  socket.on("joinRoom", (roomId) => {
    socket.join(roomId);
  });

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