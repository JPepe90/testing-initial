import jwtVerify from '../jwt/verify.js';
import { UserModel } from '../../models/User.js';
import logger from '../logger/winston.js';

const defaultOptions = {
  throwOnError: true,
};

const authenticate = (options) => async (req, res, next) => {
  const _options = { ...defaultOptions, ...options };
  try {
    const data = await jwtVerify(req.headers.authorization);

    if (!data.username) {
      logger.error({message: 'El token recibido no posee la informacion necesaria para continuar'});
      throw new Error('Invalid Token');
    }

    const infoUser = await UserModel.findOne({ username: data.username});

    if (!infoUser) {
      logger.error({message: 'El token recibido no posee la informacion necesaria para continuar'});
      throw new Error('Invalid Token');
    }

    req.user = infoUser;
    next();
    return true;
  } catch (e) {
    if (e && e.message) {
      logger.error({ message: e.message });
    }

    if (_options.throwOnError) {
      return res.status(401).json({ error: e.message });
    }

    next();
    return false;
  }
};

export default authenticate;
