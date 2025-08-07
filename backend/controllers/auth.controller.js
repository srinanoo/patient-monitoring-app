const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../models');
const User = db.User;
const sendResponse = require('../utils/responseHelper');

exports.register = async (req, res) => {
  try {
    const { email, password, role } = req.body;
    const hashed = await bcrypt.hash(password, 10);

    const isUserExist = await User.findOne({ where: { email } });
    if (isUserExist) 
        return sendResponse(res, {
            statusCode: 404,
            success: false,
            error: `${role} already exists`
        });
    
    const user = await User.create({ email, password: hashed, role });
    return sendResponse(res, {
        statusCode: 201,
        success: true,
        message: `${role} created successfully`
    });
  } catch (err) {
    return sendResponse(res, {
        statusCode: 500,
        success: false,
        error: err?.errors[0]?.message
    });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });
    if (!user) 
        return sendResponse(res, {
            statusCode: 400,
            success: false,
            error: 'Email not found'
        });

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) 
        return sendResponse(res, {
            statusCode: 400,
            success: false,
            error: 'Incorrect Password'
        });

    const token = jwt.sign({ id: user.id, email: user.email, role: user.role }, process.env.JWT_SECRET);
    return sendResponse(res, {
        statusCode: 200,
        success: true,
        data: token
    });
  } catch (err) {
    return sendResponse(res, {
        statusCode: 500,
        success: false,
        error: err?.errors[0]?.message
    });
  }
};
