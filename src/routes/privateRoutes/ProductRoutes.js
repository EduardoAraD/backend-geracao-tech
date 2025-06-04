const express = require('express');
const ProductController = require('../../controllers/ProductController');

const ProductRoutes = express.Router();
const productController = new ProductController();

ProductRoutes.post('/v1/product', productController.create);
ProductRoutes.put('/v1/product/:id', productController.update);
ProductRoutes.delete('/v1/product/:id', productController.remove);

module.exports = ProductRoutes;
