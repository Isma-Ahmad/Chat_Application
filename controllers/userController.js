const UserService = require('../services/userService');
const EmailService  = require('../services/emailService');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');


class UserController{
constructor(){
  this.userService = new UserService();
  this.emailService = new EmailService();
}

async register (req, res) {
  const { username,email, password, role } = req.body;
    const user = await this.userService.createUser(username,email, password, role);
    res.status(201).json(user);

};

async login (req, res) {
  const { email, password } = req.body;
    const user = await this.userService.findUserByUserEmail(email);
    if (user && await bcrypt.compare(password, user.password)) {
      const token = jwt.sign({ id: user.id, username: user.email, role: user.role }, 'abc@123');
      res.json({ token });
    } else {
      res.status(401).json({ error: 'Invalid credentials' });
    }
  
};

async updateUser (req, res){
  const { id } = req.params;
  const { username,email, password } = req.body;
    const user = await this.userService.updateUserById(id, username,email, password);
    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ error: 'User not found' });
    }

};

async deleteUser (req, res){
  const { id } = req.params;
    const user = await this.userService.deleteUserById(id);
    if (user) {
      res.sendStatus(204);
    } else {
      res.status(404).json({ error: 'User not found' });
    }
 
};

async approveUser(req, res) {
  const { id } = req.body;

  try {
    const approvedUser = await this.userService.approveUser(id);
    await this.emailService.sendApprovalEmail(approvedUser);
    res.status(200).json({ message: 'User approved and email sent', user: approvedUser });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}
}
module.exports = UserController;
