const express = require('express');
const PaymentController = require('../../controllers/PaymentController');

const PaymentRoutes = express.Router();
const paymentController = new PaymentController();

PaymentRoutes.get('/v1/payment/user/:id', paymentController.getPaymentByUserId);
PaymentRoutes.post('/v1/payment', paymentController.create);
PaymentRoutes.put('/v1/payment/:id', paymentController.update);
PaymentRoutes.delete('/v1/payment/:id', paymentController.remove);

module.exports = PaymentRoutes;
