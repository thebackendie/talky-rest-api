const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');
const Users = require('../models/users');
const Tokens = require('../models/jwtTokens');
const AppError = require('../utils/appError');
const {Configurations} = require('../config/configurations');


const configs = new Configurations();

exports.authMiddleware = asyncHandler( async(req,res, next) => {
    //1. Get and check the token
    let token;
    if (req.headers?.authorization?.startsWith('Bearer')) {
        token = req.headers.authorization.split(' ')[1];
        try {
            if (token) {
                const decoded = jwt.verify(token, configs.JWT_SECRET);
                // 2) Check if token is refresh token
                const token_type = decoded.token_type;
                if (token_type === 'refresh_token') {
                    return next( new AppError( 'Inappropriate use of token. Please use access_token instead!', 400) );
                }
                // Check if token is blacklisted
                const isBlacklisted = await Tokens.findOne({ where: {token, is_blacklisted: true}});
                if (isBlacklisted) {
                    return next( new AppError('Wrong token', 400) );
                }

                const user = await Users.findByPk(decoded.id);
                // 3) Check if user still exists
                if (!user) {
                    return next( new AppError( 'Invalid Account.', 401) );
                }
                if (user.status !== 'active') {
                    return next( new AppError('User Account not active : kindly contact Administrator!', 400) );
                }
                if (user.is_terminated) {
                    return next( new AppError('User Account terminated: kindly contact Administrator!', 400) );
                }
                req.user = user;
                next();
            }
        } catch (error) {
            next(error);
        }
    } else {
        return next( new AppError('You are not logged in! Please log in to get access.', 401) );
    }
});
