
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Turno = sequelize.define('Turno', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  fecha: {
    type: DataTypes.DATE,
    allowNull: false
  },
  motivo: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  estado: {
    type: DataTypes.ENUM(
      'pendiente',
      'confirmado',
      'cancelado'
    ),
    allowNull: false,
    defaultValue: 'pendiente'
  },
  usuarioId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: 'usuario_id'
  }
}, {
  tableName: 'turnos',
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at'
});

module.exports = Turno;
