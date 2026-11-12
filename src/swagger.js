const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const options = {
  definition: {
    openapi: '3.0.3',
    info: {
      title: 'Puesto de Chance API',
      version: '1.0.0',
      description: 'API RESTful para la gestión de ventas, sorteos y caja de un puesto de chance.',
    },
    servers: [{ url: 'http://localhost:3000', description: 'Servidor Local' }],
    components: {
      securitySchemes: {
        bearerAuth: { type: 'http', scheme: 'bearer', bearerFormat: 'JWT' },
      },
    },
  },
  apis: ['./src/routes/index.js'], // Documentaremos las rutas desde aquí
};

const swaggerSpec = swaggerJsdoc(options);

function swaggerDocs(app) {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
  app.get('/api-docs.json', (req, res) => res.json(swaggerSpec));
}

module.exports = swaggerDocs;