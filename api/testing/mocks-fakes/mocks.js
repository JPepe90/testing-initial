const mockingoose = require('mockingoose');
const { ProfileModel } = require('../../models/Profile');

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
    return mockingoose(ProfileModel).toReturn(usr, 'findOne');
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

module.exports = {
  spyGetAll,
  stubs,
  fakeProfiles,
};
