// import Mongoose from 'mongoose';
const Mongoose = require('mongoose');

// export const ProfileSchema = new Mongoose.Schema(
const ProfileSchema = new Mongoose.Schema(
  {
    username: {
      type: String,
      unique: true,
      lowercase: true,
      required: true,
    },
    name: {
      type: String,
      unique: false,
      lowercase: false,
      required: false,
    },
    img: {
      type: String,
      unique: false,
      lowercase: false,
      required: false,
    },
  },
  { timestamps: true },
);

// export const ProfileModel = Mongoose.model('profile', ProfileSchema);
const ProfileModel = Mongoose.model('profile', ProfileSchema);

module.exports = {
  ProfileSchema,
  ProfileModel,
};
