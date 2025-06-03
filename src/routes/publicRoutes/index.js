const express = require('express');
const CategoryRoutes = require('./CategoryRoutes');

const PublicRoutes = express.Router();

PublicRoutes.use(CategoryRoutes)

module.exports = PublicRoutes;
