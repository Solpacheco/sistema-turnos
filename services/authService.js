
const jwt = require('jsonwebtoken');

const generarToken = (usuario) => {
  return jwt.sign(
    {
      id: usuario.id,
      email: usuario.email
    },
    process.env.JWT_SECRET,
    { expiresIn: '2h' }
  );
};

const verificarToken = (token) => {
  return jwt.verify(token, process.env.JWT_SECRET);
};

module.exports = {
  generarToken,
  verificarToken
};
