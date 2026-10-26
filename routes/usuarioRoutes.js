
const express = require('express');
const router = express.Router();

const {
  listarUsuarios,
  obtenerUsuario,
  crearUsuario,
  iniciarSesion,
  actualizarUsuario,
  eliminarUsuario,
  obtenerPerfil
} = require('../controllers/usuarioController');

const verificarToken = require('../middlewares/authMiddleware');

router.post('/login', iniciarSesion);
router.post('/register', crearUsuario);

router.get('/perfil', verificarToken, obtenerPerfil);

router.get('/', listarUsuarios);
router.get('/:id', obtenerUsuario);
router.post('/', crearUsuario);
router.put('/:id', actualizarUsuario);
router.delete('/:id', eliminarUsuario);

module.exports = router;
