const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
require('express-async-errors');

const routes = require('./src/routes');
const error = require('./src/utils/errorHandler');

const createApp = () => {
  const app = express();

  app.use(express.json());
  app.use(cors({ origin: '*' }));
  app.use(morgan('dev'));
  app.use(routes);
  app.use(error);

  return app;
};

module.exports = { createApp };
