// import jwt from 'jsonwebtoken';
// import config from '../../config.js';
// import logger from '../logger/winston.js';

// REQUIRE
const jwt = require('jsonwebtoken');
const config = require('../../config');
const logger = require('../logger/winston');

const jwtSign = (payload) => {
  if (!payload) {
    logger.error({ message: 'Nop se recibio el payload necesario para el proceso de firmado' });
    return false;
  }

  return jwt.sign(payload, config.jwt.secret, { expiresIn: '15m' });
};

// export default jwtSign;
module.exports = jwtSign;
