const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('chat_application', 'postgres', '1234', {
    host: 'localhost',
    dialect: 'postgres'
});

module.exports = sequelize;
