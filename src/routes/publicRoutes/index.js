const express = require('express');
const CategoryRoutes = require('./CategoryRoutes');
const ProductRoutes = require('./ProductRoutes');

const PublicRoutes = express.Router();

PublicRoutes.use(CategoryRoutes);
PublicRoutes.use(ProductRoutes);

module.exports = PublicRoutes;
