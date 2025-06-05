const express = require('express');
const PurchaseController = require('../../controllers/PurchaseController');

const PurchaseRoutes = express.Router();
const purchaseController = new PurchaseController();

PurchaseRoutes.get('/v1/purchase/user/:id', purchaseController.getPurchasesByUserId);
PurchaseRoutes.post('/v1/purchase', purchaseController.create);

module.exports = PurchaseRoutes;
