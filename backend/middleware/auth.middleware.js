const jwt = require('jsonwebtoken');
const sendResponse = require('../utils/responseHelper');

const authMiddleware = (req, res, next) => {
  const header = req.headers.authorization || '';
  const token = header.split(' ')[1];
  if (!token) 
    return sendResponse(res, {
        statusCode: 401,
        success: false,
        error: 'You are not authorised'
    });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch {
    return sendResponse(res, {
        statusCode: 401,
        success: false,
        error: 'Invalid token'
    });
  }
};

const authorize = (roles = []) => (req, res, next) => {
  if (!roles.includes(req.user.role)) {
    return sendResponse(res, {
        statusCode: 403,
        success: false,
        error: 'You are not authorised'
    });
  }
  next();
};

module.exports = { authMiddleware, authorize };
