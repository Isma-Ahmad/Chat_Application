const express = require('express');
const { register, login, updateUser, deleteUser } = require('../controllers/userController');
const { authenticateToken, authorizeRole } = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.put('/update/:id', authenticateToken, authorizeRole('admin'), updateUser);
router.delete('/delete/:id', authenticateToken, authorizeRole('admin'), deleteUser);

module.exports = router;
