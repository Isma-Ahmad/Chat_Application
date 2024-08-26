const bcrypt = require('bcryptjs');
const { User } = require('../models');

const createUser = async (username, password, role) => {
  const hashedPassword = await bcrypt.hash(password, 10);
  return User.create({ username, password: hashedPassword, role });
};

const findUserByUsername = async (username) => {
  return User.findOne({ where: { username } });
};

const findUserById = async (id) => {
  return User.findByPk(id);
};

const updateUserById = async (id, username, password) => {
  const user = await findUserById(id);
  if (user) {
    if (username) user.username = username;
    if (password) user.password = await bcrypt.hash(password, 10);
    return user.save();
  }
  return null;
};

const deleteUserById = async (id) => {
  const user = await findUserById(id);
  if (user) {
    await user.destroy();
    return user;
  }
  return null;
};

module.exports = { 
  createUser, 
  findUserByUsername,
   findUserById, 
   updateUserById, 
   deleteUserById
   };
