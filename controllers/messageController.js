const MessageServices = require('../services/messageService');

class MessageController{
  
  constructor(){
    this.messageServices = new MessageServices();
  }
async sendMessage (req, res){
  const { receiverId, content } = req.body;
  const senderId = req.user.id;
  const images = req.files ? req.files.map(file => file.filename) : [];
  const message = await this.messageServices.createMessage(senderId, receiverId, content,images);
  res.status(201).json(message);
 
};

async getMessagesByUser(req, res){
  const { userId } = req.params;
    const messages = await this.messageServices.findMessagesByUserId(userId);
    res.json(messages);
 
};

async getAllMessages(req, res){
    const messages = await this.messageServices.findAllMessages();
    res.json(messages);
 
};


async getOwnMessagesByDateRange(req, res) {
  const { startDate, endDate } = req.query;
  const userId = req.user.id; 

  try {
    const messages = await this.messageServices.findMessagesByUserIdAndDateRange(userId, startDate, endDate);
    res.status(200).json(messages);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}


async getMessagesByDateRangeForAdmin(req, res) {
  const { startDate, endDate, userId } = req.query;

  try {
    const messages = await this.messageServices.findMessagesByDateRangeForAdmin(startDate, endDate, userId);
    res.status(200).json(messages);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

}
module.exports =  MessageController;

