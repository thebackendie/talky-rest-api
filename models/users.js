const {DataTypes, Model} = require('sequelize');

const sequelize = require('../config/db_connection').sequelize;
const bcrypt = require('bcrypt');

class Users extends Model {}

Users.init({
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    first_name: {
        type: DataTypes.STRING(255),
        allowNull: false,
    },
    last_name: {
        type: DataTypes.STRING(255),
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING(255),
        allowNull: false,
        unique: true, // Adds unique constraint
        index: true, // Adds index on this field
    },
    password: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    profile_picture: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    role: {
        type: DataTypes.ENUM('user', 'admin'),
        allowNull: false,
        defaultValue: 'user'
    },
    status: {
        type: DataTypes.ENUM('active', 'inactive'),
        allowNull: false,
        defaultValue: 'active'
    },
    is_terminated: {
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
    modelName: 'Users', // We need to choose the model name
    tableName: 'users'
});

// Add password comparison method
Users.prototype.comparePassword = async function (candidatePassword, userPassword) {
    return bcrypt.compare(candidatePassword, userPassword);
};

// Hook to hash the password before saving
Users.beforeCreate(async (users) => {
    const hashedPassword = await bcrypt.hash(users.password, 10);
    users.password = hashedPassword;
});

module.exports = Users;