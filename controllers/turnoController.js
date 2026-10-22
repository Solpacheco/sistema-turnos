
const { Turno, Usuario } = require('../models');

const listarTurnos = async (req, res) => {
  try {
    const turnos = await Turno.findAll();
    res.json(turnos);
  } catch (error) {
    console.error('Error al listar turnos:', error);
    res.status(500).json({ mensaje: 'Error al listar turnos' });
  }
};

const obtenerTurno = async (req, res) => {
  try {
    const turno = await Turno.findByPk(req.params.id);

    if (!turno) {
      return res.status(404).json({ mensaje: 'Turno no encontrado' });
    }

    res.json(turno);
  } catch (error) {
    console.error('Error al obtener turno:', error);
    res.status(500).json({ mensaje: 'Error al obtener turno' });
  }
};

const crearTurno = async (req, res) => {
  try {
    const { fecha, motivo, usuarioId } = req.body;

    if (!fecha || !motivo || !usuarioId) {
      return res.status(400).json({
        mensaje: 'Fecha, motivo y usuarioId son obligatorios'
      });
    }

    const usuario = await Usuario.findByPk(usuarioId);

    if (!usuario) {
      return res.status(404).json({
        mensaje: 'El usuario indicado no existe'
      });
    }

    const turno = await Turno.create({
      fecha,
      motivo,
      usuarioId
    });

    res.status(201).json({
      mensaje: 'Turno creado correctamente',
      turno
    });
  } catch (error) {
    console.error('Error al crear turno:', error);
    res.status(500).json({ mensaje: 'Error al crear turno' });
  }
};

const actualizarTurno = async (req, res) => {
  try {
    const turno = await Turno.findByPk(req.params.id);

    if (!turno) {
      return res.status(404).json({ mensaje: 'Turno no encontrado' });
    }

    const { fecha, motivo, estado } = req.body;

    if (fecha !== undefined) turno.fecha = fecha;
    if (motivo !== undefined) turno.motivo = motivo;
    if (estado !== undefined) turno.estado = estado;

    await turno.save();

    res.json({
      mensaje: 'Turno actualizado correctamente',
      turno
    });
  } catch (error) {
    console.error('Error al actualizar turno:', error);
    res.status(500).json({ mensaje: 'Error al actualizar turno' });
  }
};

const eliminarTurno = async (req, res) => {
  try {
    const turno = await Turno.findByPk(req.params.id);

    if (!turno) {
      return res.status(404).json({ mensaje: 'Turno no encontrado' });
    }

    await turno.destroy();

    res.json({ mensaje: 'Turno eliminado correctamente' });
  } catch (error) {
    console.error('Error al eliminar turno:', error);
    res.status(500).json({ mensaje: 'Error al eliminar turno' });
  }
};

module.exports = {
  listarTurnos,
  obtenerTurno,
  crearTurno,
  actualizarTurno,
  eliminarTurno
};
