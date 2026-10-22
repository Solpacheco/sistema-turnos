const express = require('express');
const router = express.Router();

const {
  listarTurnos,
  obtenerTurno,
  crearTurno,
  actualizarTurno,
  eliminarTurno
} = require('../controllers/turnoController');

router.get('/', listarTurnos);
router.get('/:id', obtenerTurno);
router.post('/', crearTurno);
router.put('/:id', actualizarTurno);
router.delete('/:id', eliminarTurno);

module.exports = router;