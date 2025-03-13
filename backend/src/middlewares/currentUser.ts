import jwt from 'jsonwebtoken';
import User from '../models/user';

export const decodeToken = (encodedToken, callback) => {
  jwt.verify(encodedToken, process.env.JWT_SECRET, callback);
};

export default function (req, res, next) {
  const tokenHeader = req.headers['authorization'];

  if (tokenHeader) {
    const [, token] = tokenHeader.split(' ');

    decodeToken(token, async function (err, decoded) {
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
