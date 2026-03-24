import dotenv from 'dotenv';
import path from 'path';
dotenv.config({ path: path.resolve("./.env") });


import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import cors from 'cors';
import http from 'http';
import { Server } from 'socket.io';

import AuthRoute from './Routes/AuthRoute.js';
import UserRoute from './Routes/UserRoute.js';
import PostRoute from './Routes/PostRoute.js';
import UploadRoute from './Routes/UploadRoute.js';



const app = express();

// ✅ IMPORTANT: fallback port
const PORT = process.env.PORT || 5000;

// ⭐ CREATE HTTP SERVER
const server = http.createServer(app);

// ⭐ SOCKET SETUP (FIXED CORS)
const io = new Server(server, {
  cors: {
    origin: "*", // allow all (for now)
  },
});

// ⭐ SOCKET LOGIC
io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  socket.on("joinRoom", (roomId) => {
    socket.join(roomId);
  });

  socket.on("sendMessage", ({ roomId, message }) => {
    io.to(roomId).emit("receiveMessage", message);
  });

  socket.on("disconnect", () => {
    console.log("User disconnected");
  });
});

// Static files
app.use(express.static('public'));
app.use('/images', express.static('images'));

// Middleware
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

// Routes
app.use('/auth', AuthRoute);
app.use('/user', UserRoute);
app.use('/post', PostRoute);
app.use('/upload', UploadRoute);

// ⭐ DEBUG LOG
console.log("Starting server...");

// ⭐ CONNECT DB + START SERVER
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected ✅");

    server.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.log("MongoDB error ❌", error);
  });
  
  console.log("Mongo URI:", process.env.MONGO_URI);
  
  
 

