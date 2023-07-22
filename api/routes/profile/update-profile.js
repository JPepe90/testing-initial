import { Router } from 'express';
import { body, check, header, validationResult } from 'express-validator';
import { UserModel } from '../../models/User.js';
import jwtVerify from '../../utils/jwt/verify.js';
import { ProfileModel } from '../../models/Profile.js';

export const updateUser = Router();

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
        return response.status(400).json({ errors: errors.array() });
      }

      if (!request.body.name && !request.body.img) {
        return response.status(400).json({
          message: 'No se envió ningun parametro disponible para actualizar',
        });
      }

      let user = request.user;
      const profile = await ProfileModel.findOne({ username: user.username });

      if (!profile) {
        return response.status(404).json({
          msg: 'No se ha encontrado el profile'
        });
      }

      if (request.body.name) { await ProfileModel.findOneAndUpdate({ username: user.username }, { name: request.body.name }) }
      if (request.body.img) { await ProfileModel.findOneAndUpdate({ username: user.username }, { img: request.body.img }) }

      const doc = await ProfileModel.findOne({ username: user.username });

      return response.status(200).json({
        doc,
      });

    } catch (error) {
      console.error(`[update Profile]: ${error}`);

      return response.status(500).json({
        error: 'An unexpected error happened. Please try again later',
      });
    }
  }
);
