/* eslint-disable import/extensions */
/* eslint-disable import/prefer-default-export */
// import { Router } from 'express';
// import { body, validationResult } from 'express-validator';
// import { UserModel } from '../models/User.js';
// import hashPkg from '../utils/crypt/compare.js';
// import jwtPkg from '../utils/jwt/sign.js';
// import logger from '../utils/logger/winston.js';

// REQUIRE
const express = require('express');
const { body, validationResult } = require('express-validator');
const { UserModel } = require('../models/User.js');
const hashPkg = require('../utils/crypt/compare.js');
const jwtPkg = require('../utils/jwt/sign.js');
const logger = require('../utils/logger/winston.js');

const compararHash = hashPkg;
const jwtSign = jwtPkg;

// export const login = Router();
const login = express.Router();

login.post(
  '/',
  // Validación y sanitización de los datos de entrada
  body('username').not().isEmpty().trim(), // valida que el usuario no este vacio y le quita los espacios
  body('password').isLength({ min: 6 }), // verifica que el largo del password sera como minimo 6

  //
  async (request, response) => {
    try {
      const errors = validationResult(request);
      if (!errors.isEmpty()) {
        return response.status(400).json({ errors: errors.array() });
      }

      const { username, password } = request.body;

      const user = await UserModel.findOne({ username });

      if (!user) {
        return response.status(400).json({
          error: 'username or password is incorrect',
        });
      }

      const isPasswordValid = compararHash(password, user.password); // @@ comparo pw hasheada

      if (!isPasswordValid) {
        return response.status(400).json({
          error: 'username or password is incorrect',
        });
      }

      // @todo: generate a JWT token
      const token = jwtSign({ username: user.username });

      return response.status(201).json({ token, username: user.username });
    } catch (error) {
      logger.error({ message: `[signIn]: ${error}` });

      return response.status(500).json({
        error: 'An unexpected error happened. Please try again later',
      });
    }
  },
);

module.exports = login;
