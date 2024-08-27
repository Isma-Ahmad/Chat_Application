const UserService = require('../services/userService');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');


class UserController{
constructor(){
  this.userService = new UserService();
}

async register (req, res) {
  const { username, password, role } = req.body;
    const user = await this.userService.createUser(username, password, role);
    res.status(201).json(user);

};

async login (req, res) {
  const { username, password } = req.body;
    const user = await this.userService.findUserByUsername(username);
    if (user && await bcrypt.compare(password, user.password)) {
      const token = jwt.sign({ id: user.id, username: user.username, role: user.role }, 'abc@123');
      res.json({ token });
    } else {
      res.status(401).json({ error: 'Invalid credentials' });
    }
  
};

async updateUser (req, res){
  const { id } = req.params;
  const { username, password } = req.body;
    const user = await this.userService.updateUserById(id, username, password);
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
}
module.exports = UserController;
