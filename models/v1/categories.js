const {DataTypes, Model} = require('sequelize');
const Users = require("./users");

const sequelize = require('../../config/db_connection').sequelize;

const Users = require('../v1/users');

class Categories extends Model {}

Categories.init({
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING(255),
        allowNull: false,
    },
    author: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Users,
            key: 'id'
        },
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
    sequelize,
    modelName: 'Categories',
    tableName: 'categories'
});