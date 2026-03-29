import express from "express";
import Chat from "../models/ChatModel.js";

const router = express.Router();

// ✅ CREATE CHAT
router.post("/", async (req, res) => {
  console.log("🔥 CHAT API HIT");
  console.log("BODY:", req.body);

  const { senderId, receiverId } = req.body;

  if (!senderId || !receiverId) {
    return res.status(400).json({ message: "Missing IDs ❌" });
  }

  try {
    const existingChat = await Chat.findOne({
      members: { $all: [senderId, receiverId] },
    });

    if (existingChat) {
      return res.status(200).json(existingChat);
    }

    const newChat = new Chat({
      members: [senderId, receiverId],
    });

    const result = await newChat.save();

    res.status(200).json(result);
  } catch (error) {
    console.log("ERROR:", error);
    res.status(500).json(error);
  }
});

// ✅ GET USER CHATS
router.get("/:userId", async (req, res) => {
  try {
    const chats = await Chat.find({
      members: { $in: [req.params.userId] },
    });

    res.status(200).json(chats);
  } catch (error) {
    res.status(500).json(error);
  }
});

export default router;