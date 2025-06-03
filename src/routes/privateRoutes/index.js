const express = require('express');
const UserRoutes = require('./UserRoutes');
const CategoryRoutes = require('./CategoryRoutes');

const PrivateRoutes = express.Router();

PrivateRoutes.use(UserRoutes);
PrivateRoutes.use(CategoryRoutes)

module.exports = PrivateRoutes;
