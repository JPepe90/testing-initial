/* eslint-disable import/no-extraneous-dependencies */
// import 'dotenv/config';
require('dotenv').config();

const config = {
  mongo: {
    url: process.env.DATABASE_URL,
  },

  jwt: {
    secret: process.env.JWT_SECRET,
  },
};

// export default config;
module.exports = config;
