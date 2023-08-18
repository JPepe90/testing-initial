/* eslint-disable import/no-extraneous-dependencies */
const request = require('supertest');
const portUsed = require('tcp-port-used');
const createApp = require('../../app');

describe('Test de Hello Endpoint', () => {
  let app = null;
  let server = null;

  async function portCheck(port) {
    portUsed.check(port, 'localhost')
      .then((state) => {
        if (!state) return false;
        return true;
      })
      .catch((err) => console.error('error en la consulta del puerto', err.message));
  }

  beforeAll(() => {
    app = createApp;
    server = app.listen(3002);
  });

  afterAll(async () => {
    await server.close();
  });

  describe('Test for [GET]', () => {
    test('Deberia retornar >> Practica de testing a una API funcionando con Node.js', async () => request(app)
      .get('/')
      .expect(200)
      .then((response) => {
        expect(response.text).toEqual('Practica de testing a una API funcionando con Node.js');
      }));
  });
});
