const { createUser, findUserByUsername, updateUserById, deleteUserById } = require('../services/userService');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const register = async (req, res) => {
  const { username, password, role } = req.body;
    const user = await createUser(username, password, role);
    res.status(201).json(user);

};

const login = async (req, res) => {
  const { username, password } = req.body;
    const user = await findUserByUsername(username);
    if (user && await bcrypt.compare(password, user.password)) {
      const token = jwt.sign({ id: user.id, username: user.username, role: user.role }, 'abc@123');
      res.json({ token });
    } else {
      res.status(401).json({ error: 'Invalid credentials' });
    }
  
};

const updateUser = async (req, res) => {
  const { id } = req.params;
  const { username, password } = req.body;
    const user = await updateUserById(id, username, password);
    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ error: 'User not found' });
    }

};

const deleteUser = async (req, res) => {
  const { id } = req.params;
    const user = await deleteUserById(id);
    if (user) {
      res.sendStatus(204);
    } else {
      res.status(404).json({ error: 'User not found' });
    }
 
};

module.exports = { 
  register, 
  login, 
  updateUser, 
  deleteUser 
};
