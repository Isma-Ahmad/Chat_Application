
const { DataTypes } = require('sequelize');
module.exports = (sequelize) => {
  return sequelize.define('Message', {
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    images: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: true
  },
  
  }, {
    timestamps: true,
  });
};
