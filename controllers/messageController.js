const { createMessage, findMessagesByUserId, findAllMessages } = require('../services/messageService');

const sendMessage = async (req, res) => {
  const { receiverId, content } = req.body;
  const senderId = req.user.id;
  const images = req.files ? req.files.map(file => file.filename) : [];
  const message = await createMessage(senderId, receiverId, content,images);
  res.status(201).json(message);
 
};

const getMessagesByUser = async (req, res) => {
  const { userId } = req.params;
    const messages = await findMessagesByUserId(userId);
    res.json(messages);
 
};

const getAllMessages = async (req, res) => {
    const messages = await findAllMessages();
    res.json(messages);
 
};

module.exports = { 
  sendMessage, 
  getMessagesByUser, 
  getAllMessages 
};
