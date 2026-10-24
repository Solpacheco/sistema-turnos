
const { Sequelize } = require('sequelize');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

const esProduccion = process.env.DB_HOST &&
  process.env.DB_HOST !== 'localhost';

const opciones = {
  host: process.env.DB_HOST || 'localhost',
  port: Number(process.env.DB_PORT) || 3306,
  dialect: 'mysql',
  logging: false
};

if (esProduccion) {
  opciones.dialectOptions = {
    ssl: {
      ca: process.env.DB_CA_CERT,
      rejectUnauthorized: true
    }
  };
}

const sequelize = new Sequelize(
  process.env.DB_NAME || 'sistema_turnos',
  process.env.DB_USER || 'root',
  process.env.DB_PASSWORD,
  opciones
);

module.exports = sequelize;


