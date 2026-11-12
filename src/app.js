const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const rutas = require('./routes');
const { noEncontrado, manejarErrores } = require('./middlewares/errorHandler');
const swaggerDocs = require('./swagger'); 

const app = express();

app.use(cors());
app.use(express.json());
if (process.env.NODE_ENV !== 'test') app.use(morgan('dev'));

// NUEVO: Solo inicializamos Swagger si NO estamos en entorno de pruebas
if (process.env.NODE_ENV !== 'test') {
  swaggerDocs(app);
}

app.get('/health', (req, res) => res.json({ estado: 'ok', hora: new Date().toISOString() }));
app.use('/api/v1', rutas);
app.use(noEncontrado);
app.use(manejarErrores);

module.exports = app;