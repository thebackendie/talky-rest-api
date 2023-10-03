const {DataTypes, Model} = require('sequelize');

const sequelize = require('../config/db_connection').sequelize;

const Users = require('./users');
const Posts = require('./posts');

class Comments extends Model {}

Comments.init({
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    comments: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    author: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Users,
            key: 'id'
        }
    },
    post: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Posts,
            key: 'id'
        }
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
    modelName: 'Comments',
    tableName: 'comments'
});

module.exports = Comments;