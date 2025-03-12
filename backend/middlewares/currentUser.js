const jwt = require('jsonwebtoken');
const User = require('../models/user');

module.exports = function (req, res, next) {
  const tokenHeader = req.headers['authorization'];

  if (tokenHeader) {
    const [, token] = tokenHeader.split(' ');

    jwt.verify(token, process.env.JWT_SECRET, async function (err, decoded) {
      if (err) {
        console.log('Invalid token');
        return res.status(403).json({ message: 'Invalid token' });
      } else {
        const user = await User.findById(decoded.id);
        req.currentUser = user;
        next();
      }
    });
  } else {
    next();
  }
}
