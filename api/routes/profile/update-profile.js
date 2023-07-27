/* eslint-disable import/extensions */
/* eslint-disable import/prefer-default-export */
/* eslint-disable max-len */
// import { Router } from 'express';
// import {
//   body, check, header, validationResult,
// } from 'express-validator';
// import { UserModel } from '../../models/User.js';
// import { profileService } from '../../services/profiles.js';
// import logger from '../../utils/logger/winston.js';

// REQUIRE
const express = require('express');
const { body, check, header, validationResult } = require('express-validator');
const { UserModel } = require('../../models/User.js');
const profileService = require('../../services/profiles.js');
const logger = require('../../utils/logger/winston.js');

// export const updateUser = Router();
const updateUser = express.Router();

updateUser.put(
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

  // @todo: Actualizar información usuario según la sesión del token JWT
  async (request, response) => {
    try {
      const errors = validationResult(request);

      if (!errors.isEmpty()) {
        logger.info({ message: `[profileRouter] No se pudo actualizar el profile por los siguientes errores: ${errors.array()}` });
        return response.status(400).json({ errors: errors.array() });
      }

      if (!request.body.name && !request.body.img) {
        logger.info({ message: '[profileRouter] No se envió ningun parametro disponible para actualizar' });
        return response.status(400).json({
          message: 'No se envió ningun parametro disponible para actualizar',
        });
      }

      const { user } = request;
      const profile = await profileService.get(user.username);

      if (!profile) {
        return response.status(404).json({
          msg: 'No se ha encontrado el profile',
        });
      }

      const updateParams = {};
      if (request.body.name) updateParams.name = request.body.name;
      if (request.body.img) updateParams.img = request.body.img;
      const result = await profileService.update(user.username, updateParams);

      if (!result) {
        logger.info({ message: `[profileUpdateRouter] Hubo un error al actualizar el Profile del usuario ${request.user.username}.` });
        return response.status(500).json({
          error: 'An unexpected error happened. Please try again later',
        });
      }

      logger.info({ message: `[profileUpdateRouter] Actualizacion correcta del Profile del usuario ${request.user.username}.` });
      const doc = await profileService.get(user.username);

      return response.status(200).json({
        doc,
      });
    } catch (error) {
      logger.error({ message: `[update Profile]: ${error}` });

      return response.status(500).json({
        error: 'An unexpected error happened. Please try again later',
      });
    }
  },
);

module.exports = updateUser;
