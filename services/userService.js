const bcrypt = require('bcryptjs');
const { User } = require('../models');

class UserService{

async createUser (username, password, role){
  const hashedPassword = await bcrypt.hash(password, 10);
  return User.create({ username, password: hashedPassword, role });
};

async findUserByUsername (username){
  return User.findOne({ where: { username } });
};

async updateUserById (id, username, password) {
  const user = await findUserById(id);
  if (user) {
    if (username) user.username = username;
    if (password) user.password = await bcrypt.hash(password, 10);
    return user.save();
  }
  return null;
};

async deleteUserById (id){
  const user = await findUserById(id);
  if (user) {
    await user.destroy();
    return user;
  }
  return null;
};

}

module.exports = UserService;
