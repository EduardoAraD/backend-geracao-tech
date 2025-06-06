const express = require('express')
const UserController = require('../../controllers/UserController');

const UserRoutes = express.Router();
const userController = new UserController();

UserRoutes.put('/v1/user/:id', userController.update)
UserRoutes.delete('/v1/user/:id', userController.remove)

module.exports = UserRoutes;
