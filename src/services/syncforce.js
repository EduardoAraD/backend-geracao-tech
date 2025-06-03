const connection = require('../config/connection');

require('../models/UserModel');

connection.sync({ alter: true });
