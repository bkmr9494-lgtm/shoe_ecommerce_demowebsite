const jwt = require('jsonwebtoken');

exports.protect = (req, res, next) => {
  let token = req.headers.authorization;
  if (token && token.startsWith('Bearer')) {
    try {
      token = token.split(' ')[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET || 'FALLBACK_SECRET');
      req.user = decoded;
      next();
    } catch (error) {
      return res.status(401).json({ message: 'Authorization token invalid' });
    }
  } else {
    return res.status(401).json({ message: 'No authorization matrix found' });
  }
};

exports.adminOnly = (req, res, next) => {
  if (req.user && req.user.role === 'admin') {
    next();
  } else {
    res.status(403).json({ message: 'Resource restricted to Admin nodes only' });
  }
};