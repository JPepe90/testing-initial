const profileService = require('../../services/profiles');
const { generateManyProfiles } = require('../mocks-fakes/profiles.fake');

const { spyGetAll, stubs, fakeProfiles } = require('../mocks-fakes/mocks');

// TESTS
describe('Test for Profile Service', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  // FUNCTIONS
  function findUsr(usr) {
    const user = fakeProfiles.find((item) => item.username === usr);

    if (!user) return false;

    return user;
  }

  describe('Test getAll', () => {
    test('Return all users list', async () => {
      // Arrange
      const fProf = generateManyProfiles(20);
      stubs.getAll(); // STUB o MOCK
      spyGetAll.mockResolvedValue(fProf); // SPY
      // Act
      const users = await profileService.getAll();
      // Assert
      expect(users.length).toEqual(fProf.length);
      expect(spyGetAll).toHaveBeenCalled();
      expect(spyGetAll).toHaveBeenCalledTimes(1);
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
