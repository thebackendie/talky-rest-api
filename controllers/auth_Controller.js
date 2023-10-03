const asyncHandler = require('express-async-handler');
const jwt = require('jsonwebtoken');

const AppError = require('../utils/appError');
const {Configurations} = require('../config/configurations');


const Users = require('../models/users');
const Tokens = require("../models/jwtTokens");

// Generating JWT Tokens
const configs = new Configurations();

const generateToken = (id, token_type, expiresIn) => {
  return jwt.sign({id, token_type}, configs.JWT_SECRET, {expiresIn});
};

const generateRefreshToken = (id, token_type, expiresIn) => {
    return jwt.sign({ id , token_type}, configs.JWT_SECRET, { expiresIn });
};

// Controller Functions
exports.signUp = asyncHandler( async (req, res, next) => {
    const {email} = req.body;

    // check if user exists
    const user = await Users.findOne({ where: email });
    if (!user){
        try {
            const newUser = await Users.create(req.body);
            res.status(201).json({
               success: true,
               message: 'Registration successful',
               data: newUser
            });

        } catch (error) {
            next(error);
        }
    }
    else{
        next(new AppError("User already exists", 400));
    }

});

exports.signIn = asyncHandler( async (req, res, next) => {
   const {email, password} = req.body;

   let user = await Users.findOne({attributes: { exclude: ['createdAt','updatedAt'] }, where: { email }});
   if (user && await user.comparePassword(password, user.password)){
       const access_token = generateToken(user?.id, 'access_token', '1d');
       const refresh_token = generateRefreshToken(user?.id, 'refresh_token', '3d');

       await Tokens.create({token: refresh_token, token_type: 'refresh', user: user.id});

       // Exclude password from user data
       user = await User.findOne({ attributes: { exclude: ['password','createdAt', 'updatedAt'] }, where: { email} });

       // Send tokens in cookies to user
       res.cookie('access_token', access_token, {
           maxAge:24 * 60 * 60 * 1000,
           httpOnly: true
       });
       res.cookie('refresh_token', refresh_token, {
           maxAge:72 * 60 * 60 * 1000,
           httpOnly: true
       });
       res.status(200).json({
           success: true,
           message: "Login successful",
           data: { access_token, refresh_token, user }
       });
   }
   else {
       return next(new AppError('Invalid Credentials', 400));
   }
});

exports.handleRefreshToken = asyncHandler( async (req, res, next) => {
    const cookie = req.cookies;
    if (!cookie.refresh_token)
        return next(new AppError('No Refresh Token', 400));

    // Find it's user
    const user = await jwtTokenModel.findAll({ where: { token: refreshToken}});
    if (!user)
        return next(new AppError('Refresh token is not linked to a user.', 400));

    // Blacklist the token
    await Tokens.create({ token: refresh_token, token_type:'refresh', user:req.user.id, is_blacklisted: true});

    // Verify the token
    jwt.verify(refreshToken, process.env.JWT_SECRET_KEY, (err, decoded) => {

        if (err || user.id !== decoded.id)
            return new AppError('There is something wrong with refresh token', 400);

        // Generate and send new refresh and access tokens
        const access_token = generateToken(user?.id, 'access_token', '1d');
        const refresh_token = generateToken(user?.id, 'refresh_token', '3d');

        res.cookie('access_token', access_token, {
            maxAge:24 * 60 * 60 * 1000,
            httpOnly: true
        });

        res.cookie('refresh_token', refresh_token, {
            maxAge:72 * 60 * 60 * 1000,
            httpOnly: true
        });

        res.status(200).json({ access_token, refresh_token});

    });
});

exports.logout = asyncHandler(async (req, res, next) => {
    // check for refresh and access
    const cookie = req.cookies;
    if (!cookie.refresh_token)
        return next(new AppError('No Refresh Token', 400));
    if (!cookie.access_token)
        return next(new AppError('No Access Token', 400));

    // Get refresh and access tokens
    const refresh_token = cookie.refresh_token;
    const access_token = cookie.access_token;

    // Blacklist Refresh Tokens
    const blacklistRefreshToken = await Tokens.findOne({ where: { token: refresh_token, user:req.user.id}});
    if (!blacklistRefreshToken) {
        await Tokens.create({ token: refresh_token, token_type:'refresh', user:req.user.id, is_blacklisted: true});
    } else{
        await blacklistRefreshToken.update({is_blacklisted: true});
    }

    // Blacklist Access Tokens
    const blacklistAccessToken = await jwtTokenModel.findOne({ where: {token: access_token, user:req.user.id}});
    if (!blacklistAccessToken) {
        await Tokens.create({ token: access_token, token_type:'access', user:req.user.id, is_blacklisted: true});
    } else{
        await blacklistAccessToken.update({is_blacklisted: true});
    }

    // Clear cookies
    res.clearCookie('refresh_token', {
        httpOnly: true,
        secure: true
    });
    res.clearCookie('access_token', {
        httpOnly: true,
        secure: true
    });
    return res.sendStatus(204);
});