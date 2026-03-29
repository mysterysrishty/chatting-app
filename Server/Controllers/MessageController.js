import MessageModel from "../models/MessageModel.js";

// add message
export const addMessage = async (req, res) => {
  const { chatId, senderId, text } = req.body;

  try {
    const message = new MessageModel({
      chatId,
      senderId,
      text,
    });

    const result = await message.save();
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json(error);
  }
};

// get messages
export const getMessages = async (req, res) => {
  const { chatId } = req.params;

  try {
    const result = await MessageModel.find({ chatId });
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json(error);
  }
};