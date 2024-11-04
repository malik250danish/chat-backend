// routes/chat.js
const express = require("express");
const { getMessages } = require("../controllers/chatController");
const router = express.Router();

router.get("/messages", getMessages);

module.exports = router;
