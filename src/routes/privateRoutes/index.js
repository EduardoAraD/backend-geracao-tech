const express = require('express');

const validateToken = require('../../middleware/auth');

const UserRoutes = require('./UserRoutes');
const CategoryRoutes = require('./CategoryRoutes');
const ProductRoutes = require('./ProductRoutes');
const AddressRoutes = require('./AddressRoutes');
const PaymentRoutes = require('./PaymentRoutes');
const PurchaseRoutes = require('./PurchaseRoutes');

const PrivateRoutes = express.Router();

PrivateRoutes.use(validateToken);

PrivateRoutes.use(UserRoutes);
PrivateRoutes.use(ProductRoutes);
PrivateRoutes.use(CategoryRoutes);
PrivateRoutes.use(AddressRoutes);
PrivateRoutes.use(PaymentRoutes);
PrivateRoutes.use(PurchaseRoutes);

module.exports = PrivateRoutes;
