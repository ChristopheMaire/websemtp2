var sequelize = require('../db.js');
const Sequelize = require('sequelize');

const Produit = sequelize.define('produit', {
        nom:        Sequelize.STRING,
        quantite:   Sequelize.STRING,
        prix :      Sequelize.FLOAT
    }
    , {
        tableName : 'produit',
        createdAt : 'sys_created',
        updatedAt : 'sys_modified',
        deletedAt : false,
        freezeTableName: true
    });

Produit.sync();

module.exports = Produit;