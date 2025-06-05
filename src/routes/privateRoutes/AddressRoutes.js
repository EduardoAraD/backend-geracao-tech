const express = require('express');
const AddressController = require('../../controllers/AddressController');

const AddressRoutes = express.Router();
const addressController = new AddressController();

AddressRoutes.get('/v1/address/user/:id', addressController.getAddressByUserId);
AddressRoutes.post('/v1/address', addressController.create);
AddressRoutes.put('/v1/address/:id', addressController.update);
AddressRoutes.delete('/v1/address/:id', addressController.remove);

module.exports = AddressRoutes;
