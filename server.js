const express = require('express');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');


// Uncaught Exceptions
process.on('uncaughtException', error => {
    console.log('UNCAUGHT EXCEPTION! 💥 Shutting down...');
    console.log(error.name, error.message, error.stack);
    process.exit(1);
});

const dotenv = require('dotenv');
dotenv.config({ path: './config/.env' });

const bodyParser = require('body-parser');

const app = express();

// Logging Routes
app.use(morgan('dev'));

// Parsing JSON
app.use(bodyParser.json({ limit: '50kb' }));
app.use(bodyParser.urlencoded({ extended: false }));

// Parsing Cookies
app.use(cookieParser());

const port = process.env.PORT || 4000;

const sequelize = require('./config/db_connection').sequelize;

sequelize
    .sync({ alter: true })
    .then(result => {
        console.log("Database synced.")
        const server = app.listen(port, () => {
            console.log(`App running on port ${port}...`);
            console.log(`App running in ${process.env.NODE_ENV} environment...`);
        });
    })
    .catch(error => {
        console.log(error);
    });

// Handling Unhandled Rejection
process.on('unhandledRejection', err => {
    console.log(`An error occurred: ${err.name}, ${err.message}`);
    console.log('Unhandled rejection! shutting down server...');
    server.close(() => { process.exit(1); });
});