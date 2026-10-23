
const express = require('express');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
require('dotenv').config();

const sequelize = require('./config/database');
require('./models');

const usuarioRoutes = require('./routes/usuarioRoutes');
const turnoRoutes = require('./routes/turnoRoutes');

const app = express();

app.use(cors());
app.use(express.json());

app.use(rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 100,
  standardHeaders: 'draft-8',
  legacyHeaders: false,
}));

app.use('/api/usuarios', usuarioRoutes);
app.use('/api/turnos', turnoRoutes);

app.get('/', (req, res) => {
  res.json({
    mensaje: 'API Sistema de Gestión de Turnos funcionando'
  });
});

const PORT = process.env.PORT || 3000;

async function iniciarServidor() {
  try {
    await sequelize.authenticate();
    console.log('Conexión a MySQL exitosa');

    await sequelize.sync();
    console.log('Modelos sincronizados con la base de datos');

    app.listen(PORT, () => {
      console.log(`Servidor escuchando en el puerto ${PORT}`);
    });
  } catch (error) {
    console.error('Error al iniciar el servidor:', error.message);
    process.exit(1);
  }
}

iniciarServidor();


