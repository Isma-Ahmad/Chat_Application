const { Sequelize } = require('sequelize');
const sequelize = new Sequelize('chat_application', 'postgres', '1234', {
  host: 'localhost',
  dialect: 'postgres'
});


const User = require('./user')(sequelize);
const Message = require('./message')(sequelize);


Message.belongsTo(User, { as: 'sender', foreignKey: 'senderId' });
Message.belongsTo(User, { as: 'receiver', foreignKey: 'receiverId' });


sequelize.sync();

module.exports = { sequelize, User, Message };
