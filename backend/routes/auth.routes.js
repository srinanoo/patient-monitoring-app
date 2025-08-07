const router = require('express').Router();
const { register, login } = require('../controllers/auth.controller');
const { body } = require('express-validator');

router.post('/register', body('email').isEmail(), register);
router.post('/login', body('email').isEmail(), body('password').exists(), login);

module.exports = router;
