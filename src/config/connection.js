const { Sequelize } = require('sequelize');
require('dotenv').config();

const connection = new Sequelize(process.env.CONNECT_DATABASE);

module.exports = connection;
