module.exports = function (req, res, next) {
  if (req.currentUser) {
    next();
  } else {
    return res.status(403).json({ message: 'Token not found' });
  }
}
