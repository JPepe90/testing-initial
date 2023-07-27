// import bcrypt from 'bcryptjs';
// import logger from '../logger/winston.js';

// REQUIRE
const bcrypt = require('bcryptjs');
const logger = require('../logger/winston');

const compararHash = (crudo, hash) => {
  if (!crudo || !hash) {
    logger.error({ message: 'No se recibieron los parametros necesarios para verificar autenticidad' });
    return false;
  }
  return bcrypt.compareSync(crudo, hash);
};

// export default compararHash;
module.exports = compararHash;
