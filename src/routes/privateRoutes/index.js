const express = require('express');
const UserRoutes = require('./UserRoutes');

const PrivateRoutes = express.Router();

PrivateRoutes.use(UserRoutes);

module.exports = PrivateRoutes;
