const express = require('express');
const userRoutes = require('./routes/userRoutes');
const messageRoutes = require('./routes/msgRoutes');

const app = express();
app.use(express.json());

app.use('/users', userRoutes);
app.use('/messages', messageRoutes);

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
