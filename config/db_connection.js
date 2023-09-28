const {ProductionConfig, DevConfig, StagingConfig} = require('../config/configurations');
const Sequelize = require('sequelize');

const dotenv = require('dotenv');
dotenv.config({ path: '../config/.env' });

let db_host = undefined;
let db_user = undefined;
let db_name = undefined;
let db_password = undefined;
let config = undefined;

switch (process.env.NODE_ENV) {
    case 'development':
        config = new DevConfig();
        db_host = config.db_host
        db_user = config.db_user
        db_name = config.db_name
        db_password = config.db_password
        break;
    case 'staging':
        config = new StagingConfig();
        db_host = config.db_host
        db_user = config.db_user
        db_name = config.db_name
        db_password =config.db_password
        break;
    case 'production':
        config = new ProductionConfig();
        db_host = config.db_host
        db_user = config.db_user
        db_name = config.db_name
        db_password = config.db_password
        break;
}

console.log(db_host, db_password, db_name, db_user);

// Setting Database Connection
const sequelize = new Sequelize(db_name, db_user, db_password, {
    dialect: 'mysql',
    host: db_host,
    logging: false
})

// Establishing Database Connection
sequelize
    .authenticate()
    .then( () => {
        console.log("Connection established");
    })
    .catch((err) => {
        console.error("Unable to connect the database: ", err);
    });

module.exports = {sequelize}
