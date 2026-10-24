
const { Sequelize } = require('sequelize');
require('dotenv').config();

const esProduccion = process.env.DB_HOST &&
  process.env.DB_HOST !== 'localhost';

const sequelize = new Sequelize(
  process.env.DB_NAME || 'sistema_turnos',
  process.env.DB_USER || 'root',
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST || 'localhost',
    port: Number(process.env.DB_PORT) || 3306,
    dialect: 'mysql',
    logging: false,
    dialectOptions: esProduccion
      ? {
          ssl: {
            require: true,
            rejectUnauthorized: true
          }
        }
      : {}
  }
);

module.exports = sequelize;
