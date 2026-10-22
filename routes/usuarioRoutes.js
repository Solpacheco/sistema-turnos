
const express = require('express');
const router = express.Router();

const {
  listarUsuarios,
  obtenerUsuario,
  crearUsuario,
  actualizarUsuario,
  eliminarUsuario
} = require('../controllers/usuarioController');

router.get('/', listarUsuarios);
router.get('/:id', obtenerUsuario);
router.post('/', crearUsuario);
router.put('/:id', actualizarUsuario);
router.delete('/:id', eliminarUsuario);

module.exports = router;
