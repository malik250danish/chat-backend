// controllers/chatController.js
const Message = require("../models/Message");

exports.getMessages = async (req, res) => {
  const { userId, contactId } = req.query;
  try {
    const messages = await Message.find({
      $or: [
        { sender: userId, receiver: contactId },
        { sender: contactId, receiver: userId },
      ],
    }).sort("timestamp");
    res.json(messages);
  } catch (error) {
    res.status(500).json({ message: "Error fetching messages", error });
  }
};
