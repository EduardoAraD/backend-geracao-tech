const express = require('express');

const UserRoutes = require('./UserRoutes');
const CategoryRoutes = require('./CategoryRoutes');
const ProductRoutes = require('./ProductRoutes');
const validateToken = require('../../middleware/auth');

const PrivateRoutes = express.Router();

PrivateRoutes.use(validateToken);

PrivateRoutes.use(UserRoutes);
PrivateRoutes.use(ProductRoutes);
PrivateRoutes.use(CategoryRoutes);

module.exports = PrivateRoutes;
