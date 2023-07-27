/* eslint-disable import/extensions */
/* eslint-disable import/no-extraneous-dependencies */
// import 'dotenv/config';
// import { app } from './app.js';
// import { connect as db } from './database.js';
// import logger from './utils/logger/winston.js';

// REQUIRE
require('dotenv').config();
const app = require('./app.js');
const mongoConnect = require('./database.js');
const logger = require('./utils/logger/winston.js');

const PORT = process.env.PORT || 3000;

const server = app.listen(PORT, () => logger.info({ message: `[server] Connected to port ${PORT}` }));
mongoConnect();

process.on('unhandledRejection', (err) => {
  logger.error({ message: `[server] An error occurred: ${err.message}` });
  server.close(() => process.exit(1));
});
