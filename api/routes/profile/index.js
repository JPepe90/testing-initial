/* eslint-disable import/prefer-default-export */
/* eslint-disable import/extensions */
// import { Router } from 'express';
// import { deleteUser } from './delete-profile.js';
// import { viewUser } from './view-profile.js';
// import { updateUser } from './update-profile.js';

// REQUIRE
const express = require('express');
const deleteUser = require('./delete-profile.js');
const viewUser = require('./view-profile.js');
const updateUser = require('./update-profile.js');

// export const profile = Router();
const profile = express.Router();

profile.use('/', viewUser);
profile.use('/', deleteUser);
profile.use('/', updateUser);

module.exports = profile;
