const jwt = require('jsonwebtoken');

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (token == null) return res.sendStatus(401);

  jwt.verify(token, 'abc@123', async (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
};


const authorizeRole = (role) => (req, res, next) => {
  if (req.user.role !== role) return res.sendStatus(403);
  next();
};

module.exports = { 
  authenticateToken, 
  authorizeRole 
};
