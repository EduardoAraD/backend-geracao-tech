const express = require('express');
const ProductController = require('../../controllers/ProductController');

const ProductRoutes = express.Router();
const productController = new ProductController();

ProductRoutes.get('/v1/product', productController.search);
ProductRoutes.get('/v1/product/:id', productController.getById);

module.exports = ProductRoutes;
