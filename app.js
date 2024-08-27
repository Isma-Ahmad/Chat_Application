const express = require('express');
const UserRoutes = require('./routes/userRoutes');
const userRoutes = new UserRoutes();
const MessageRoutes = require('./routes/msgRoutes');
const messageRoutes = new MessageRoutes();
const app = express();
app.use(express.json());

app.use('/users', userRoutes.getUserRouter());
app.use('/messages', messageRoutes.getRouter());

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
