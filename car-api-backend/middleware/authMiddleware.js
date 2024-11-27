const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET;

module.exports = (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1]; // Access token from header

  if (!token) {
    return res.status(401).json({ error: 'Not Provide Token' });
  }

  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({ error: 'Invalid Token' });
    }
    req.user = decoded;
    next();
  });
};
