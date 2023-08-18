/* eslint-disable import/order */
/* eslint-disable import/no-extraneous-dependencies */
const request = require('supertest');
const createApp = require('../../app');
// const mongoConnect = require('../database');
const { ProfileModel } = require('../../models/Profile');

// MOCKS
const mockingoose = require('mockingoose');
const { generateManyProfiles } = require('../mocks-fakes/profiles.fake');

const spyGetAll = jest.fn();

// MOCKS/STUBS (mockingoose)
const stubs = {
  getAll: () => mockingoose(ProfileModel).toReturn(spyGetAll, 'find'),
};

describe('Test de profiles', () => {
  let app = null;
  let server = null;
  beforeAll(() => {
    app = createApp;
    server = app.listen(3001);
    // mongoConnect();
  });

  afterAll(async () => {
    await server.close();
  });

  describe('Test for [GET] /api/v1/profiles/', () => {
    test('Deberia retornar una lista con varios profiles', async () => {
      // Arrange
      const fProf = generateManyProfiles(30);
      stubs.getAll();
      spyGetAll.mockResolvedValue(fProf);

      // Act
      return request(app)
        .get('/api/v1/profiles/')
        .expect(200)
        .then((data) => {
          console.log(data._body);
          // Assert
          expect(data._body.length).toEqual(fProf.length);
        });
    });
  });
});
