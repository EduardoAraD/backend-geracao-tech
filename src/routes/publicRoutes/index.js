const express = require('express');

const CategoryRoutes = require('./CategoryRoutes');
const ProductRoutes = require('./ProductRoutes');
const AuthRoutes = require('./AuthRoutes');
const UserRoutes = require('./UserRoutes');

const PublicRoutes = express.Router();

PublicRoutes.use(AuthRoutes);
PublicRoutes.use(UserRoutes);
PublicRoutes.use(CategoryRoutes);
PublicRoutes.use(ProductRoutes);

module.exports = PublicRoutes;
