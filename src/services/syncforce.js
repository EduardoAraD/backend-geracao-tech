const connection = require('../config/connection');

require('../models/UserModel');
require('../models/CategoryModel');
require('../models/ProductModel');

require('../models/ImageProductModel');
require('../models/OptionsProductModel');
require('../models/CategorysAndProductsModel');

connection.sync({ alter: true });
