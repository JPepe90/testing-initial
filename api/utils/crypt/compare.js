import bcrypt from 'bcryptjs';
import logger from '../logger/winston.js';

const compararHash = (crudo, hash) => {
  if (!crudo || !hash) {
    logger.error({ message: 'No se recibieron los parametros necesarios para verificar autenticidad' });
    return false;
  }
  return bcrypt.compareSync(crudo, hash);
};

export default compararHash;
