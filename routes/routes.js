// create route
const express = require('express')

const router = express.Router();

// Routers
const authRouter = require('./authRouter');


//Routes
router.use('/auth',authRouter);

module.exports = {router}