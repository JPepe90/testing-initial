/* eslint-disable import/prefer-default-export */
import Mongoose from 'mongoose';
import logger from './utils/logger/winston.js';

const url = process.env.DATABASE_URL;

if (!url) {
  logger.error({ message: 'Los datos para conectarse a la BD son incorrectos (DB_URL)' });
  throw new Error('DATABASE_URL is not set');
}

export const connect = async () => {
  await Mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  logger.info({ message: '[db] Connected' });
};
