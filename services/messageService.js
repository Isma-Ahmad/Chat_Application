
const { User, Message } = require('../models');
const { Op } = require('sequelize');
const msgEmailService = require('../middleware/msgEmail')

class MessageServices{
  constructor() {
    this.msgemailService = new msgEmailService();
  }

  async createMessage(senderId, receiverId, content, images = []) {
    const sender = await User.findByPk(senderId);
    const receiver = await User.findByPk(receiverId);

    if (!receiver) throw new Error('Receiver not found');

    const message = await Message.create({ senderId, receiverId, content, images });

    if (receiver.isEmail) {
      await this.msgemailService.sendMessageNotification(sender, receiver, content, images);
    }

    return message;
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

async findMessagesByUserIdAndDateRange(userId, startDate, endDate) {
  const whereCondition = {
    receiverId: userId,
    createdAt: {
      [Op.between]: [startDate, endDate],
    },
  };

  return Message.findAll({
    where: whereCondition,
    include: [{ model: User, as: 'sender' }, { model: User, as: 'receiver' }],
  });
}


async findMessagesByDateRangeForAdmin(startDate, endDate, userId = null) {
  const whereCondition = {
    createdAt: {
      [Op.between]: [startDate, endDate],
    },
  };

  if (userId) {
    whereCondition.receiverId = userId;
  }

  return Message.findAll({
    where: whereCondition,
    include: [{ model: User, as: 'sender' }, { model: User, as: 'receiver' }],
  });
}

}
module.exports =  MessageServices;
