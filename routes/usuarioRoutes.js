
const express = require('express');
const router = express.Router();

const {
  listarUsuarios,
  obtenerUsuario,
  crearUsuario,
  iniciarSesion,
  actualizarUsuario,
  eliminarUsuario
} = require('../controllers/usuarioController');

router.post('/login', iniciarSesion);

router.get('/', listarUsuarios);
router.get('/:id', obtenerUsuario);
router.post('/', crearUsuario);
router.put('/:id', actualizarUsuario);
router.delete('/:id', eliminarUsuario);

module.exports = router;
