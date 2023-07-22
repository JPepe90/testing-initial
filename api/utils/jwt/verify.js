import jwt from 'jsonwebtoken';
import config from '../../config.js';
import logger from '../logger/winston.js';

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

export default jwtVerify;
