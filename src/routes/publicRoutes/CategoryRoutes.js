const express = require('express');
const CategoryController = require('../../controllers/CategoryController');

const CategoryRoutes = express.Router();
const categoryController = new CategoryController();

CategoryRoutes.get('/v1/category', categoryController.search);
CategoryRoutes.get('/v1/category/:id', categoryController.getById);

module.exports = CategoryRoutes;
