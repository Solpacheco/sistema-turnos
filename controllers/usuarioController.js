
const bcrypt = require('bcrypt');
const { Usuario } = require('../models');

const listarUsuarios = async (req, res) => {
  try {
    const usuarios = await Usuario.findAll({
      attributes: { exclude: ['password'] }
    });

    res.json(usuarios);
  } catch (error) {
    console.error('Error al listar usuarios:', error);
    res.status(500).json({ mensaje: 'Error al listar usuarios' });
  }
};

const obtenerUsuario = async (req, res) => {
  try {
    const usuario = await Usuario.findByPk(req.params.id, {
      attributes: { exclude: ['password'] }
    });

    if (!usuario) {
      return res.status(404).json({ mensaje: 'Usuario no encontrado' });
    }

    res.json(usuario);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al obtener usuario' });
  }
};

const crearUsuario = async (req, res) => {
  try {
    const { nombre, email, password } = req.body;

    if (!nombre || !email || !password) {
      return res.status(400).json({
        mensaje: 'Nombre, email y contraseña son obligatorios'
      });
    }

    const formatoEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

if (!formatoEmail.test(email)) {
  return res.status(400).json({
    mensaje: 'El formato del email no es válido'
  });
}

    const existente = await Usuario.findOne({ where: { email } });

    if (existente) {
      return res.status(409).json({
        mensaje: 'Ya existe un usuario con ese email'
      });
    }

    const passwordHash = await bcrypt.hash(password, 10);

    const usuario = await Usuario.create({
      nombre,
      email,
      password: passwordHash
    });

    res.status(201).json({
      mensaje: 'Usuario creado correctamente',
      usuario: {
        id: usuario.id,
        nombre: usuario.nombre,
        email: usuario.email
      }
    });
  } catch (error) {
    console.error('Error al crear usuario:', error);
    res.status(500).json({ mensaje: 'Error al crear usuario' });
  }
};

const actualizarUsuario = async (req, res) => {
  try {
    const usuario = await Usuario.findByPk(req.params.id);

    if (!usuario) {
      return res.status(404).json({ mensaje: 'Usuario no encontrado' });
    }

    const { nombre, email, password } = req.body;

    if (email && email !== usuario.email) {
      const existente = await Usuario.findOne({ where: { email } });

      if (existente) {
        return res.status(409).json({
          mensaje: 'Ya existe un usuario con ese email'
        });
      }
    }

    if (nombre !== undefined) usuario.nombre = nombre;
    if (email !== undefined) usuario.email = email;

    if (password) {
      usuario.password = await bcrypt.hash(password, 10);
    }

    await usuario.save();

    res.json({
      mensaje: 'Usuario actualizado correctamente',
      usuario: {
        id: usuario.id,
        nombre: usuario.nombre,
        email: usuario.email
      }
    });
  } catch (error) {
    console.error('Error al actualizar usuario:', error);
    res.status(500).json({ mensaje: 'Error al actualizar usuario' });
  }
};

const eliminarUsuario = async (req, res) => {
  try {
    const usuario = await Usuario.findByPk(req.params.id);

    if (!usuario) {
      return res.status(404).json({ mensaje: 'Usuario no encontrado' });
    }

    await usuario.destroy();

    res.json({ mensaje: 'Usuario eliminado correctamente' });
  } catch (error) {
    console.error('Error al eliminar usuario:', error);
    res.status(500).json({ mensaje: 'Error al eliminar usuario' });
  }
};

module.exports = {
  listarUsuarios,
  obtenerUsuario,
  crearUsuario,
  actualizarUsuario,
  eliminarUsuario
};

