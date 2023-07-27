/* eslint-disable import/extensions */
/* eslint-disable import/prefer-default-export */

// IMPORT
// import express from 'express';
// import cors from 'cors';
// import { signUp } from './routes/sign-up.js';
// import { login } from './routes/login.js';
// import { profile } from './routes/profile/index.js';
// import { profiles } from './routes/view-profiles.js';
// import authenticate from './utils/auth/authentication.js';

// REQUIRE
const express = require('express');
const cors = require('cors');
const signUp = require('./routes/sign-up.js');
const login = require('./routes/login.js');
const profile = require('./routes/profile');
const profiles = require('./routes/view-profiles.js');
const authenticate = require('./utils/auth/authentication.js');

// export const app = express();
const app = express();

// Middlewares
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// API
// @todo: Almancenar el password de forma segura
app.use('/api/v1/sign-up', signUp);
// @todo: generar un token jwt seguro para la sesión del usuario
app.use('/api/v1/login', login);
// @todo: completar las rutas de profile
app.use('/api/v1/profile', authenticate({ throwOnError: true }), profile);
app.use('/api/v1/profiles', profiles);

app.get('/', async (req, res) => {
  res.send('Practica de testing a una API funcionando con Node.js');
});

module.exports = app;
