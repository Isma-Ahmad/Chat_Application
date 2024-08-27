const { Sequelize,DataTypes } = require('sequelize');
const sequelize = new Sequelize('chat_application', 'postgres', '1234', {
  host: 'localhost',
  dialect: 'postgres'
});


const User = require('./user')(sequelize);
const Message = require('./message')(sequelize);


Message.belongsTo(User, { as: 'sender', foreignKey: 'senderId' });
Message.belongsTo(User, { as: 'receiver', foreignKey: 'receiverId' });


sequelize.sync();

// (async () => {
//     try {
      
//         await sequelize.authenticate();
//         console.log('Connection has been established successfully.');

     
//         const queryInterface = sequelize.getQueryInterface();

   
//         await queryInterface.addColumn('Messages', 'image', {
//         type: DataTypes.ARRAY(DataTypes.STRING),
//            allowNull: true

//         });

//         console.log('Column added successfully.');

//     } catch (error) {
//         console.error('Error updating column:', error.message);
//         console.error(error);
//     } 
//     finally {
    
//         await sequelize.close();
//     }
// })();

module.exports = { sequelize, User, Message };
