const { faker } = require('@faker-js/faker');

const generateOneProfile = () => ({
  // _id: faker.string.uuid(),
  username: faker.internet.displayName(),
  name: faker.person.fullName(),
  img: faker.image.avatarLegacy(),
});

const generateManyProfiles = (cant) => {
  const limit = cant ?? 10;
  const profilesArray = [];

  for (let i = 0; i < limit; i += 1) {
    const profile = generateOneProfile();
    profilesArray.push(profile);
  }

  return [...profilesArray];
};

module.exports = {
  generateOneProfile,
  generateManyProfiles,
};
