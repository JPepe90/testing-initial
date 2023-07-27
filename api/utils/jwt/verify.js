// import jwt from 'jsonwebtoken';
// import config from '../../config.js';
// import logger from '../logger/winston.js';

// REQUIRE
const jwt = require('jsonwebtoken');
const config = require('../../config');
const logger = require('../logger/winston');

async function jwtVerify(header) {
  const headerData = header.split(' ');

  if (headerData[0] !== 'Bearer') {
    logger.error({ message: 'No se recibió un metodo de autorizacion correcto' });
    return new Error('Metodo de autorizacion incorrecto');
  }

  const decoded = await jwt.verify(headerData[1], config.jwt.secret);
  logger.info({ message: 'Recuperacion de la informacion de la JWT exitosa' });

  return decoded;
}

// export default jwtVerify;
module.exports = jwtVerify;
