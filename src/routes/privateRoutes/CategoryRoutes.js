const express = require('express');
const CategoryController = require('../../controllers/CategoryController');

const CategoryRoutes = express.Router();
const categoryController = new CategoryController();

CategoryRoutes.post('/v1/category', categoryController.create);
CategoryRoutes.put('/v1/category/:id', categoryController.update);
CategoryRoutes.delete('/v1/category/:id', categoryController.remove)

module.exports = CategoryRoutes;
