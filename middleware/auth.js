const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
  // Get the token from the header
  const token = req.header('Authorization').replace('Bearer ', '');

  // Check if no token
  if (!token) {
    return res.status(401).json({ message: 'No token, authorization denied' });
  }

  try {
    // Verify token
    const decoded = jwt.verify(token, 'your_jwt_secret');
    
    // Add user from payload
    req.user = decoded;
    
    // Move to the next middleware or route handler
    next();
  } catch (err) {
    res.status(401).json({ message: 'Token is not valid' });
  }
};

module.exports = auth;
