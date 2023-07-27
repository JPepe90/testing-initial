/* eslint-disable import/prefer-default-export */
/* eslint-disable import/extensions */
// import { Router } from 'express';
// import { body, check, header, validationResult } from 'express-validator';
// import { UserModel } from '../../models/User.js';
// import { profileService } from '../../services/profiles.js';
// import logger from '../../utils/logger/winston.js';

// REQUIRE
const express = require('express');
const { body, check, header, validationResult } = require('express-validator');
const { UserModel } = require('../../models/User.js');
const profileService = require('../../services/profiles.js');
const logger = require('../../utils/logger/winston.js');

// export const deleteUser = Router();
const deleteUser = express.Router();

deleteUser.delete(
  '/',
  // @todo: Validación y sanitización de los datos de entrada
  header('Authorization').not().isEmpty(),
  check('Authorization').custom(async (header) => {
    const headerData = header.split(' ');

    if (headerData[0] !== 'Bearer') {
      throw new Error('Metodo de autorizacion incorrecto');
    }
  }),
  body('username').not().isEmpty().trim(),
  check('username').custom(async (username) => {
    const user = await UserModel.findOne({ username });

    if (!user) {
      throw new Error('El usuario no existe');
    }
  }),

  // @todo: Eliminar el usuario actual según la sesión del token JWT
  async (request, response) => {
    try {
      const errors = validationResult(request);
      if (!errors.isEmpty()) {
        return response.status(400).json({ errors: errors.array() });
      }

      const user = request.user.username;

      // await ProfileModel.deleteOne({ username: user });
      await profileService.delete(user);

      await UserModel.deleteOne({ username: user })
        .then(() => response.status(200).json({
          message: 'Se elimino el usuario',
        }))
        .catch((err) => {
          logger.error({
            message: {
              msg: 'No se pudo eliminar al usuario',
              error: err,
            },
          });

          return response.status(500).json({
            message: 'Hubo un error al eliminar al usuario',
          });
        });
    } catch (error) {
      logger.error({ message: `[delete Profile]: ${error}` });

      return response.status(500).json({
        error: 'An unexpected error happened. Please try again later',
      });
    }
    return true;
  },
);

module.exports = deleteUser;
