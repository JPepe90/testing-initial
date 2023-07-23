/* eslint-disable import/extensions */
/* eslint-disable import/prefer-default-export */
import { ProfileModel } from '../models/Profile.js';
import logger from '../utils/logger/winston.js';

export const profileService = {};

profileService.getAll = async () => {
  const data = await ProfileModel.find({});

  if (!data) return {};

  return data;
};

profileService.get = async (userName) => {
  const data = await ProfileModel.findOne({ username: userName });

  if (!data) {
    logger.info({ message: `[profileService] El servicio de profiles no pudo encontrar al usuario: ${userName}` });
    return false;
  }

  return data;
};

profileService.update = async (userName, data) => {
  try {
    const keys = Object.keys(data);

    keys.forEach(async (element) => {
      const obj = {};
      obj[element] = data[element];
      await ProfileModel.findOneAndUpdate({ username: userName }, obj);
    });

    logger.info({ message: `[profileService] El servicio de actualizacion de profiles actualizo correctamente al usuario: ${userName}` });
    return true;
  } catch (error) {
    logger.error({ message: `[profileService] El servicio de actualizacion de profiles no pudo actualizar al usuario: ${userName}` });
    return false;
  }
};

profileService.delete = async (userName) => {
  await ProfileModel.deleteOne({ username: userName });

  return true;
};
