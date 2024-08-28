const express = require('express');
const UserController = require('../controllers/userController');
const { authenticateToken, authorizeRole } = require('../middleware/authMiddleware');

class UserRoutes{
    constructor() {
        this.router = express.Router();
        this.userController = new UserController();
        this.initializeRoutes();
    }
    initializeRoutes() {
        this.router.post('/register', this.userController.register.bind(this.userController));
        this.router.post('/login',this.userController.login.bind(this.userController));
        this.router.put('/update/:id', authenticateToken,authorizeRole('admin'), this.userController.updateUser.bind(this.userController));
        this.router.delete('/delete/:id', authenticateToken,authorizeRole('admin'), this.userController.deleteUser.bind(this.userController));
        this.router.post( '/approve',  authenticateToken, authorizeRole('admin'), this.userController.approveUser.bind(this.userController)
          );
    }
    getUserRouter() {
        return this.router;
    }
}

module.exports = UserRoutes;
