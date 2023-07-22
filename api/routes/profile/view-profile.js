import { Router } from 'express';
import { body, check, header, validationResult } from 'express-validator';
import { UserModel } from '../../models/User.js';
import { ProfileModel } from '../../models/Profile.js';

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

      await ProfileModel.findOne({ username: request.user.username })
        .then((data) => {
          return response.status(200).json({
            data
          });
        })

        .catch((err) => {
          console.error('Hubo un error al buscar el Profile del usuario. Detalle:', err);

          return response.status(500).json({
            message: 'No se encontro el profile',
            error: err
          });
        });

    } catch (error) {
      console.error(`[view Profile]: ${error}`);

      return response.status(500).json({
        error: 'An unexpected error happened. Please try again later',
      });
    }
  }
);
