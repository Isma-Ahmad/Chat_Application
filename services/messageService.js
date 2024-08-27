
const { User, Message } = require('../models');
const { Op } = require('sequelize');

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
