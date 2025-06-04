const express = require('express');
const UserController = require('../../controllers/UserController');

const UserRoutes = express.Router();
const userController = new UserController();

UserRoutes.get('/v1/user/:id', userController.getById);
UserRoutes.post('/v1/user', userController.create);

module.exports = UserRoutes;
