import { Router } from 'express';
import { body, check, header, validationResult } from 'express-validator';
import { UserModel } from '../../models/User.js';
import { ProfileModel } from '../../models/Profile.js'

export const deleteUser = Router();

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

      let user = request.user.username;

      await ProfileModel.deleteOne({ username: user });

      await UserModel.deleteOne({ username: user })
        .then (() => {
          return response.status(200).json({
            message: `Se elimino el usuario`
          });
        })
        .catch((err) => {
          console.error({
            msg: 'No se pudo eliminar al usuario',
            error: err
          });

          return response.status(500).json({
            message: `Hubo un error al eliminar al usuario`
          });
        });

    } catch (error) {
      console.error(`[delete Profile]: ${error}`);

      return response.status(500).json({
        error: 'An unexpected error happened. Please try again later',
      });
    }
  }
);
