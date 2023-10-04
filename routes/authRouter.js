const express = require('express');
const authController =  require('../controllers/auth_Controller');
const {authMiddleware} = require('../middlewares/authMiddleware');
const checkRequiredFields =require('../middlewares/checkRequiredFields');

const authRouter = express.Router();

authRouter.post('/signup', checkRequiredFields(['first_name', 'last_name', 'email', 'password']) ,authController.signUp);
authRouter.post('/login', checkRequiredFields(['email', 'password']), authController.signIn);
authRouter.post('/logout', authMiddleware, authController.logout);
authRouter.post('/refresh', authController.handleRefreshToken);


module.exports  = authRouter;
