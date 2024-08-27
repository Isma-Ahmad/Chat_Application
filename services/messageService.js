
const { User, Message } = require('../models');

class MessageServices{

async createMessage(senderId, receiverId, content,images){

  const receiver = await User.findByPk(receiverId);
  if (!receiver) throw new Error('Receiver not found');

  return Message.create({ senderId, receiverId, content , images});
};

async findMessagesByUserId(userId){
  return Message.findAll({
    where: { receiverId: userId },
    include: [{ model: User, as: 'sender' }, { model: User, as: 'receiver' }],
  });
};

async findAllMessages(){
  return Message.findAll({
    include: [{ model: User, as: 'sender' }, { model: User, as: 'receiver' }],
  });
};
}
module.exports =  MessageServices;
