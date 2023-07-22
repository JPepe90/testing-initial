import bcrypt from 'bcryptjs';
import logger from '../logger/winston.js';

export default function encriptarPw(info, saltos = false) {
  if (!info) {
    logger.error({ message: 'No se recibio ninguna apw para hashear' });
    return false;
  }

  let salt;
  if (!saltos) {
    salt = bcrypt.genSaltSync(10);
  } else {
    salt = saltos;
  }

  const hash = bcrypt.hashSync(info, salt);
  logger.info({ message: 'Hash realizado exitosamente' });

  return hash;
}
