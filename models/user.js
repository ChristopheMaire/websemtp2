var sequelize = require('../db.js');
const Sequelize = require('sequelize');

const User = sequelize.define('user', {
        nom:        Sequelize.STRING,
        mdp:        Sequelize.STRING,
        privilege : Sequelize.STRING
    }
    , {
        tableName : 'user',
        createdAt : 'sys_created',
        updatedAt : 'sys_modified',
        deletedAt : false,
        freezeTableName: true
    });

User.sync();

module.exports = User;