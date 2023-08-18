/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-underscore-dangle */
const request = require('supertest');

const createApp = require('../../app');
const mongoConnect = require('../../../store/database-e2e'); // DB TEST
const { ProfileModel } = require('../../models/Profile');
const { generateManyProfiles } = require('../mocks-fakes/profiles.fake');

describe('Test de profiles', () => {
  let app = null;
  let server = null;

  beforeAll(async () => {
    // TEST SERVER INIT
    app = createApp;
    server = app.listen(3004);

    // TEST MONGO DB INIT
    await mongoConnect(); // CONNECT TO E2E DB
  });

  afterAll(async () => {
    await server.close();
    await ProfileModel.deleteMany({}); // CLEAN PROFILES DB
  });

  describe('Test for [GET] /api/v1/profiles/', () => {
    test('Deberia retornar una lista con varios profiles', async () => {
      // Arrange
      const fakeProfiles = generateManyProfiles(5);
      const seedData = await ProfileModel.insertMany(fakeProfiles);
      // console.log('>>> seedData:', seedData);

      // Act
      return request(app)
        .get('/api/v1/profiles/')
        .expect(200)
        .then((data) => {
          // console.log(data._body);

          // Assert
          expect(data._body.length).toEqual(seedData.length);
        });
    });
  });
});
