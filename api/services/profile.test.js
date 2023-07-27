const profileService = require('./profiles');
const { ProfileModel } = require('../models/Profile');
const mockingoose = require('mockingoose');

const fakeProfiles = [
  {
    _id: 1,
    username: 'jjpepe',
    name: 'javier pepe',
    img: 'https://jp.jpg',
  },
  {
    _id: 2,
    username: 'pattto',
    name: 'patricio pepe',
    img: 'https://ptp.jpg',
  },
  {
    _id: 3,
    username: 'ferEsp',
    name: 'fernando espinoza',
    img: 'https://ferEspinoza.png',
  },
  {
    _id: 4,
    username: 'mariaSantos',
    name: 'Maria Regina Santos',
    img: 'https://www.photosfb/mariaregina.jpg',
  },
  {
    _id: 5,
    username: 'GusLOP',
    name: 'gustavo lopez',
    img: 'https://gustavo-lopez.png',
  },
];

const spyGetAll = jest.fn();

// MOCKS/STUBS (mockingoose)
const stubs = {
  // getAll: () => mockingoose(ProfileModel).toReturn(fakeProfiles, 'find'),
  getAll: () => mockingoose(ProfileModel).toReturn(spyGetAll, 'find'),
  get: async (userName) => {
    const usr = fakeProfiles.find((item) => item.username === userName);
    // return mockingoose(ProfileModel).toReturn(usr, 'findOne');
    return mockingoose(ProfileModel).toReturn(spyGetAll, 'findOne');
  },
  delete: (userName) => {
    const userIndex = fakeProfiles.findIndex((item) => item.username === userName);
    const data = fakeProfiles.splice(userIndex, 1);
    return mockingoose(ProfileModel).toReturn(data, 'deleteOne');
  },
  deleteFalse: () => mockingoose(ProfileModel).toReturn([], 'deleteOne'),
  update: (userName, data) => {
    const userIndex = fakeProfiles.findIndex((item) => item.username === userName);
    const updtUsr = {
      ...fakeProfiles[userIndex],
      ...data,
    };
    mockingoose(ProfileModel).toReturn(updtUsr, 'findOneAndUpdate');
  },
};

// jest.mock('../models/Profile', () => jest.fn().mockImplementation(() => stubs));

// FUNCTIONS
function findUsr(usr) {
  const user = fakeProfiles.find((item) => item.username === usr);

  if (!user) return false;

  return user;
}

// TESTS
describe('Test for Profile Service', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Test getAll', () => {
    test('Return all users list', async () => {
      // Arrange
      stubs.getAll(); // STUB o MOCK
      spyGetAll.mockResolvedValue(fakeProfiles); // SPY
      // Act
      const users = await profileService.getAll();
      // Assert
      expect(users.length).toEqual(5);
      expect(spyGetAll).toHaveBeenCalled();
      // expect(spyGetAll).toHaveBeenCalledWith({});
    });
  }, 10000);

  describe('Test get 1 user', () => {
    test('Find Existing User', async () => {
      // Arrange
      stubs.get('jjpepe'); // STUB o MOCK para mongoose
      spyGetAll.mockResolvedValue(findUsr('jjpepe')); // SPY
      // Act
      const user = await profileService.get('jjpepe');
      const verifier = {
        username: user.username,
        name: user.name,
        img: user.img,
      };
      const data = fakeProfiles[0];
      delete data._id;
      // Assert
      expect(verifier).toEqual(data);
    });

    test('Resolve not found', async () => {
      // Arrange
      stubs.get('osvaldoL'); // STUB o MOCK para mongoose
      spyGetAll.mockResolvedValue(findUsr('osvaldoL')); // SPY
      // Act
      const user = await profileService.get('osvaldoL');
      // Assert
      expect(user).toBeFalsy();
    });
  });

  describe('Test update', () => {
    test('Update 2 params simultaneously', async () => {
      // Arrange
      const data = {
        name: 'MR Santos',
        img: 'https://www.photosfb/mrs.jpg',
      };
      stubs.update('mariaSantos', data); // STUB o MOCK para mongoose
      // Act
      const result = await profileService.update('mariaSantos', { name: 'MR Santos', img: 'https://www.photosfb/mrs.jpg' });
      // console.log(result);
      // Assert
      expect(result).not.toBeNull();
      expect(result).not.toBeFalsy();
      expect(result).not.toEqual(data);
    });

    test('Update 1 param', async () => {
      // Arrange
      const data = {
        name: 'gustavo SERGIO lopez',
      };
      stubs.update('GusLOP', data); // STUB o MOCK para mongoose
      // Act
      const result = await profileService.update('GusLOP', { name: 'gustavo SERGIO lopez' });
      // console.log(result);
      // Assert
      expect(result).not.toBeNull();
      expect(result).not.toBeFalsy();
      expect(result).not.toEqual(data);
    });
  });

  describe('Test delete', () => {
    test('Delete 1 Profile', async () => {
      // Arrange
      stubs.delete('ferEsp'); // STUB o MOCK para mongoose
      // Act
      const result = await profileService.delete('ferEsp');
      // Assert
      expect(result).toBeTruthy();
    });

    test('No delete, profile not found', async () => { // Consultar!!
      // Arrange
      stubs.deleteFalse('luiSANAlop'); // STUB o MOCK para mongoose
      // Act
      const result = await profileService.delete('luiSANAlop');
      // Assert
      expect(result).toEqual([]);
    });
  });
});
