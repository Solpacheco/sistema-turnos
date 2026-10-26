
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
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
    console.error('Error al obtener usuario:', error);
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

    const emailNormalizado = email.trim().toLowerCase();
    const formatoEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!formatoEmail.test(emailNormalizado)) {
      return res.status(400).json({
        mensaje: 'El formato del email no es válido'
      });
    }

    const existente = await Usuario.findOne({
      where: { email: emailNormalizado }
    });

    if (existente) {
      return res.status(409).json({
        mensaje: 'Ya existe un usuario con ese email'
      });
    }

    const passwordHash = await bcrypt.hash(password, 10);

    const usuario = await Usuario.create({
      nombre: nombre.trim(),
      email: emailNormalizado,
      password: passwordHash
    });

    return res.status(201).json({
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

const iniciarSesion = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        mensaje: 'Email y contraseña son obligatorios'
      });
    }

    const emailNormalizado = email.trim().toLowerCase();

    const usuario = await Usuario.findOne({
      where: { email: emailNormalizado }
    });

    if (!usuario) {
      return res.status(401).json({
        mensaje: 'Email o contraseña incorrectos'
      });
    }

    const passwordValida = await bcrypt.compare(
      password,
      usuario.password
    );

    if (!passwordValida) {
      return res.status(401).json({
        mensaje: 'Email o contraseña incorrectos'
      });
    }

    if (!process.env.JWT_SECRET) {
      console.error('Falta configurar JWT_SECRET');
      return res.status(500).json({
        mensaje: 'Error de configuración del servidor'
      });
    }

    const token = jwt.sign(
      {
        id: usuario.id,
        email: usuario.email
      },
      process.env.JWT_SECRET,
      { expiresIn: '2h' }
    );

    return res.json({
      mensaje: 'Inicio de sesión correcto',
      token,
      usuario: {
        id: usuario.id,
        nombre: usuario.nombre,
        email: usuario.email
      }
    });
  } catch (error) {
    console.error('Error al iniciar sesión:', error);
    res.status(500).json({ mensaje: 'Error al iniciar sesión' });
  }
};

const actualizarUsuario = async (req, res) => {
  try {
    const usuario = await Usuario.findByPk(req.params.id);

    if (!usuario) {
      return res.status(404).json({ mensaje: 'Usuario no encontrado' });
    }

    const { nombre, email, password } = req.body;

    if (email !== undefined) {
      if (typeof email !== 'string' || !email.trim()) {
        return res.status(400).json({
          mensaje: 'El email no puede estar vacío'
        });
      }

      const emailNormalizado = email.trim().toLowerCase();
      const formatoEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      if (!formatoEmail.test(emailNormalizado)) {
        return res.status(400).json({
          mensaje: 'El formato del email no es válido'
        });
      }

      if (emailNormalizado !== usuario.email.toLowerCase()) {
        const existente = await Usuario.findOne({
          where: { email: emailNormalizado }
        });

        if (existente) {
          return res.status(409).json({
            mensaje: 'Ya existe un usuario con ese email'
          });
        }
      }

      usuario.email = emailNormalizado;
    }

    if (nombre !== undefined) {
      if (typeof nombre !== 'string' || !nombre.trim()) {
        return res.status(400).json({
          mensaje: 'El nombre no puede estar vacío'
        });
      }

      usuario.nombre = nombre.trim();
    }

    if (password !== undefined && password !== '') {
      usuario.password = await bcrypt.hash(password, 10);
    }

    await usuario.save();

    return res.json({
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
  iniciarSesion,
  actualizarUsuario,
  eliminarUsuario
};
