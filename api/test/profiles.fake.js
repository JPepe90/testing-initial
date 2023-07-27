const { faker } = require('@faker-js/faker');

const generateOneProfile = () => ({
  _id: faker.string.uuid(),
  username: faker.internet.displayName(),
  name: faker.person.fullName(),
  img: faker.image.avatarLegacy(),
});

const generateManyProfiles = (cant) => {
  const profilesArray = [];

  for (let i = 0; i < cant; i + 1) {
    const profile = generateOneProfile();
    profilesArray.push(profile);
  }

  return profilesArray;
};

module.exports = {
  generateOneProfile,
  generateManyProfiles,
};
