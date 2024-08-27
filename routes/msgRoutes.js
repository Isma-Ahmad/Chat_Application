const express = require('express');
const MessageController = require('../controllers/messageController');
const { authenticateToken, authorizeRole } = require('../middleware/authMiddleware');
const uploadImageMiddleware = require('../middleware/uploadMiddleware');
class MessageRoutes{
    constructor() {
        this.router = express.Router();
        this.messageController = new MessageController();
        this.initializeRoutes();
    }
    initializeRoutes() {
        this.router.post('/send',authenticateToken,uploadImageMiddleware, this.messageController.sendMessage.bind(this.messageController));
        this.router.get('/items/:userId', authenticateToken,this.messageController.getMessagesByUser.bind(this.messageController));
        this.router.get('/all', authenticateToken,authorizeRole('admin'), this.messageController.getAllMessages.bind(this.messageController));
    }
    getRouter() {
        return this.router;
    }
}
module.exports = MessageRoutes;