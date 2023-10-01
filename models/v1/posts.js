const {DataTypes, Model} = require('sequelize');

const sequelize = require('../../config/db_connection').sequelize;

const Users = require('../v1/users');

class Posts extends Model {}

Posts.init({
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    category: {
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
    title: {
        type: DataTypes.STRING(255),
        allowNull: false,
    },
    description: {
        type: DataTypes.STRING(255),
        allowNull: false,
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
    modelName: 'Posts',
    tableName: 'posts'
});

module.exports = Posts;