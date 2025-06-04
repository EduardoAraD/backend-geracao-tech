const express = require('express');

const CategoryRoutes = require('./CategoryRoutes');
const ProductRoutes = require('./ProductRoutes');
const AuthRoutes = require('./AuthRoutes');

const PublicRoutes = express.Router();

PublicRoutes.use(AuthRoutes);
PublicRoutes.use(CategoryRoutes);
PublicRoutes.use(ProductRoutes);

module.exports = PublicRoutes;
