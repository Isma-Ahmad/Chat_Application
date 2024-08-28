const bcrypt = require('bcryptjs');
const { User } = require('../models');
const EmailService = require('./emailService')

class UserService{
  constructor() {
    this.emailService = new EmailService();
  }
async createUser (username,email, password, role = 'user'){

  const originalPassword = password;
  const hashedPassword = await bcrypt.hash(password, 10);
  const user= await User.create({ username,email, password: hashedPassword, role,isApproved: false  });
  await this.emailService.sendApprovalEmail(user, originalPassword);
  return user;
};

async findUserByUserEmail (email){
  return User.findOne({ where: { email } });
};

async findUserById(id) {
  return User.findByPk(id);
}

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
  const admin = await User.findByPk(id);
  if (!admin == 'admin') {
      throw new Error('Only admins can delete user');
  }

  const user = await User.findByPk(id);
  if (!user) throw new Error('User not found');

  await user.destroy();
  return { message: 'User deleted successfully' };
};


async approveUser(id) {
  
  const admin = await User.findByPk(id);
  if (!admin == 'admin') {
    throw new Error('Only admins can approve users');
  }
  const user = await User.findByPk(id);
  if (!user) {
    throw new Error('User not found');
  }
  user.isApproved = true;
  await user.save();

  return user;
}


}

module.exports = UserService;
