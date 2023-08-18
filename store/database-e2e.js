const Mongoose = require('mongoose');
const logger = require('../api/utils/logger/winston');

const url = process.env.E2E_DB_URL;
// const url = 'mongodb://localhost:27017/demo?retryWrites=true&writeConcern=majority';

if (!url) {
  logger.error({ message: 'Los datos para conectarse a la BD son incorrectos (DB_URL)' });
  throw new Error('DATABASE_URL is not set');
}

console.log(url);

// export const connect = async () => {
const connect = async () => {
  try {
    await Mongoose.set('strictQuery', true);
    await Mongoose.connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    logger.info({ message: '[db] Connected' });
  } catch (error) {
    logger.error({ message: `[db connection error] ${error.message}` });
  }
};

module.exports = connect;
