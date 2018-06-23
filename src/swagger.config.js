const swaggerJSDoc = require('swagger-jsdoc');

// Swagger definition
const swaggerDefinition = {
  info: {
    description: 'REST API for the Webtrekk customer directory.',
    version: '1.0.0',
    title: 'Webtrekk Customer Directory',
    contact: {
      contact: 'maxmedina05@gmail.com'
    }
  },
  host: 'localhost:3000',
  basePath: '/api/v1'
};
const options = {
  swaggerDefinition: swaggerDefinition,
  apis: ['./src/resources/*/*.schema.js', './src/resources/*/*.router.js']
};

module.exports = swaggerJSDoc(options);
