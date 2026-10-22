
const Usuario = require('./Usuario');
const Turno = require('./Turno');

// Un usuario puede tener muchos turnos
Usuario.hasMany(Turno, {
  foreignKey: 'usuarioId',
  as: 'turnos'
});

// Cada turno pertenece a un usuario
Turno.belongsTo(Usuario, {
  foreignKey: 'usuarioId',
  as: 'usuario'
});

module.exports = {
  Usuario,
  Turno
};
