const express = require('express');
const { sendMessage, getMessagesByUser, getAllMessages } = require('../controllers/messageController');
const { authenticateToken, authorizeRole } = require('../middleware/authMiddleware');
const uploadImageMiddleware = require('../middleware/uploadMiddleware');

const router = express.Router();

router.post('/send', uploadImageMiddleware,authenticateToken, sendMessage);
router.get('/user/:userId', authenticateToken, getMessagesByUser);
router.get('/all', authenticateToken, authorizeRole('admin'), getAllMessages);

module.exports = router;
