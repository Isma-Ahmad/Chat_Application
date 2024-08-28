const { DataTypes } = require('sequelize');
module.exports = (sequelize) => {
  return sequelize.define('User', {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
     
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    role: {
      type: DataTypes.ENUM('admin', 'user'),
      allowNull: false,
    },
    isApproved: {
      type: DataTypes.BOOLEAN,
      defaultValue: false, 
    },
  }, {
    timestamps: true,
  });
};
