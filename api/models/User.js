// import Mongoose from 'mongoose';
const Mongoose = require('mongoose');

// export const UserSchema = new Mongoose.Schema(
const UserSchema = new Mongoose.Schema(
  {
    username: {
      type: String,
      unique: true,
      lowercase: true,
      required: true,
    },
    password: {
      type: String,
      minlength: 6,
      required: true,
    },
  },
  { timestamps: true },
);

// export const UserModel = Mongoose.model('user', UserSchema);
const UserModel = Mongoose.model('user', UserSchema);

module.exports = {
  UserSchema,
  UserModel,
};
