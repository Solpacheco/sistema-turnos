
const { verificarToken } = require('../services/authService');

const verificarAutenticacion = (req, res, next) => {
  const autorizacion = req.headers.authorization;

  if (!autorizacion || !autorizacion.startsWith('Bearer ')) {
    return res.status(401).json({
      mensaje: 'Token de autenticación requerido'
    });
  }

  const token = autorizacion.split(' ')[1];

  try {
    const datos = verificarToken(token);
    req.usuario = datos;
    next();
  } catch (error) {
    return res.status(401).json({
      mensaje: 'Token inválido o vencido'
    });
  }
};

module.exports = verificarAutenticacion;
