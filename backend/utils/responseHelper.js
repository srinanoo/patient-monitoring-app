const sendResponse = (res, { statusCode = 200, success = true, data = null, error = '', message = '' }) => {
  return res.status(statusCode).json({
    success,
    message,
    data,
    error
  });
};

module.exports = sendResponse;