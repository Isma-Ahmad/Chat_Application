
const { User, Message } = require('../models');

const createMessage = async (senderId, receiverId, content,images) => {

  const receiver = await User.findByPk(receiverId);
  if (!receiver) throw new Error('Receiver not found');

  return Message.create({ senderId, receiverId, content , images});
};

const findMessagesByUserId = async (userId) => {
  return Message.findAll({
    where: { receiverId: userId },
    include: [{ model: User, as: 'sender' }, { model: User, as: 'receiver' }],
  });
};

const findAllMessages = async () => {
  return Message.findAll({
    include: [{ model: User, as: 'sender' }, { model: User, as: 'receiver' }],
  });
};

module.exports = { createMessage, findMessagesByUserId, findAllMessages };
