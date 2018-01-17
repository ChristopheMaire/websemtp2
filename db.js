const Sequelize = require('sequelize');
const sequelize = new Sequelize ('fruits', 'root','' ,{
    dialect : 'mysql' ,
    host : 'localhost'

});

module.exports = sequelize ;
