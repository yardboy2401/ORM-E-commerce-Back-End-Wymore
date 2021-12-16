//Require sequelize
const Sequelize = require('sequelize');

//Require dotenv
require('dotenv').config();

//database connection parameters with sequelize
const sequelize = process.env.JAWSDB_URL
  ? new Sequelize(process.env.JAWSDB_URL)
  : new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PW, {
      host: 'localhost',
      dialect: 'mysql',
      dialectOptions: {
        decimalNumbers: true,
      },
    });

//export sequelize module
module.exports = sequelize;
