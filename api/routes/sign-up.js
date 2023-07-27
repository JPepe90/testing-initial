/* eslint-disable import/extensions */
/* eslint-disable import/prefer-default-export */
// import { Router } from 'express';
// import { body, check, validationResult } from 'express-validator';
// import { UserModel } from '../models/User.js';
// import { ProfileModel } from '../models/Profile.js';
// import pkg from '../utils/crypt/hash.js';
// import logger from '../utils/logger/winston.js';

// REQUIRE
const express = require('express');
const { body, check, validationResult } = require('express-validator');
const { UserModel } = require('../models/User.js');
const { ProfileModel } = require('../models/Profile.js');
const pkg = require('../utils/crypt/hash.js');
const logger = require('../utils/logger/winston.js');

const encriptarPw = pkg;

// export const signUp = Router();
const signUp = express.Router();

signUp.post(
  '/',
  // Validación y sanitización de los datos de entrada
  body('username').not().isEmpty().trim(), // checkea que el usuario no este vacio y le elimina los espacios al costado
  check('username').custom(async (username) => { // verifica que el nombre de usuario este disponible
    const maybeUser = await UserModel.findOne({ username });
    if (maybeUser) {
      throw new Error('username already in use');
    }

    return true;
  }),
  body('password').isLength({ min: 6 }), // verifica que el largo del pw sea como minimo 6

  //
  async (request, response) => {
    try {
      const errors = validationResult(request);
      if (!errors.isEmpty()) {
        return response.status(400).json({ errors: errors.array() });
      }

      const { username } = request.body;
      let { password } = request.body;
      password = encriptarPw(password); // @@ guardar hasheada, no en texto plano

      const user = await UserModel.create({ username, password });

      await ProfileModel.create({ username });

      return response
        .status(201)
        .json({ username: user.username, createdAt: user.createdAt });
    } catch (error) {
      logger.error({ message: `[signIn]: ${error}` });

      return response.status(500).json({
        error: 'An unexpected error happened. Please try again later',
      });
    }
  },
);

module.exports = signUp;
