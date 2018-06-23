const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const swaggerUI = require('swagger-ui-express');
const swaggerSpec = require('./src/swagger.config');

const BASE_API_URL = '/api/v1';
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost/customerDB';
const PORT = process.env.PORT || 3000;

const resources = require('./src/resources');
const customerResource = resources.customer;

const app = express();
mongoose.connect(MONGO_URI);

bodyParser.urlencoded({ extended: true });
app.use(bodyParser.json());

app.use(`${BASE_API_URL}/customers`, customerResource.router);

app.use(`${BASE_API_URL}/docs`, swaggerUI.serve, swaggerUI.setup(swaggerSpec));

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/dist/client'));
  app.get('*', (req, res) => {
    res.sendFile(
      path.resolve(__dirname, 'client', 'dist', 'client', 'index.html')
    );
  });
}

app.listen(PORT, () => {
  console.log('App running on port:', PORT);
});
