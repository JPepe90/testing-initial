/* eslint-disable import/extensions */
/* eslint-disable import/prefer-default-export */
/* eslint-disable arrow-body-style */
import { Router } from 'express';
import {
  body, check, header, validationResult,
} from 'express-validator';
import { UserModel } from '../../models/User.js';
import { profileService } from '../../services/profiles.js';
import logger from '../../utils/logger/winston.js';

export const viewUser = Router();

viewUser.get(
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
    const maybeUser = await UserModel.findOne({ username });

    if (!maybeUser) {
      throw new Error('User not found');
    }
  }),

  // @todo: Ver información del usuario actual según la sesión del token JWT
  async (request, response) => {
    try {
      const errors = validationResult(request);

      if (!errors.isEmpty()) {
        return response.status(400).json({ errors: errors.array() });
      }

      await profileService.get(request.user.username)
        .then((data) => {
          return response.status(200).json({
            data,
          });
        })

        .catch((err) => {
          logger.info({ message: `[profileViewRouter] Hubo un error al buscar el Profile del usuario ${request.user.username}. Detalle:' ${err}` });

          return response.status(500).json({
            message: 'No se encontro el profile',
            error: err,
          });
        });
    } catch (error) {
      logger.error({ message: `[view Profile]: ${error}` });

      return response.status(500).json({
        error: 'An unexpected error happened. Please try again later',
      });
    }
    return true;
  },
);
