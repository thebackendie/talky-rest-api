const {DataTypes, Model} = require('sequelize');

const sequelize = require('../config/db_connection').sequelize;

const Users = require('./users');

class Tokens extends Model {}

Tokens.init( {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    token: {
        type: DataTypes.STRING(255),
        allowNull: false,
    },
    token_type: {
        type: DataTypes.STRING(255),
        allowNull: false,
    },
    user: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: Users,
            key: 'id'
        },
    },
    is_blacklisted: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    },
    createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW
    },
    updatedAt: {
        type: DataTypes.DATE,
        allowNull: false,
    }
}, {
    sequelize, // We need to pass the connection instance
    modelName: 'Tokens', // We need to choose the model name
    tableName: 'tokens'
});

module.exports = Tokens;