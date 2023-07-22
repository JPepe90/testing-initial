import 'dotenv/config';

const config = {
  mongo: {
    url: process.env.DATABASE_URL
  },

  jwt: {
    secret: process.env.JWT_SECRET,
  },
};

export default config;
