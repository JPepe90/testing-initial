const Mongoose = require('mongoose');
const mongoConnect = require('./database-e2e');
// const mongoConnect = require('../api/database');

async function connDb() {
  await mongoConnect();
}

async function main() {
  console.log('>>> inicializando');

  await connDb();
  console.log('llegue');

  Mongoose.connection.on('connected', () => {
    console.log('Conectado Exitosamente!');
  });
}

main();
