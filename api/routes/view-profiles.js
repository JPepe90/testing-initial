/* eslint-disable import/extensions */
/* eslint-disable import/prefer-default-export */
/* eslint-disable arrow-body-style */
// import { Router } from 'express';
// import { profileService } from '../services/profiles.js';
// import logger from '../utils/logger/winston.js';

// REQUIRE
const express = require('express');
const profileService = require('../services/profiles');
const logger = require('../utils/logger/winston.js');

// export const profiles = Router();
const profiles = express.Router();

profiles.get(
  '/',
  async (request, response) => {
    try {
      await profileService.getAll()
        .then((data) => {
          return response.status(200).json(data);
        })
        .catch((err) => {
          logger.info({ message: `[allProfilesRouter] Hubo un error al buscar todos los Profiles de usuario. Detalle: ${err}` });

          return response.status(500).json({
            message: 'No se encontro el profile',
            error: err,
          });
        });
    } catch (error) {
      logger.info({ message: `[view all Profile]: ${error}` });

      return response.status(500).json({
        error: 'An unexpected error happened. Please try again later',
      });
    }
    return true;
  },
);

module.exports = profiles;
