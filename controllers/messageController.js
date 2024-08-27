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
}
module.exports =  MessageController;

