
const jwt = require('jsonwebtoken');

const verificarToken = (req, res, next) => {
  const autorizacion = req.headers.authorization;

  if (!autorizacion || !autorizacion.startsWith('Bearer ')) {
    return res.status(401).json({
      mensaje: 'Token de autenticación requerido'
    });
  }

  const token = autorizacion.split(' ')[1];

  try {
    const datos = jwt.verify(token, process.env.JWT_SECRET);
    req.usuario = datos;
    next();
  } catch (error) {
    return res.status(401).json({
      mensaje: 'Token inválido o vencido'
    });
  }
};

module.exports = verificarToken;
