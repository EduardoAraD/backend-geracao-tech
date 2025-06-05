const connection = require('../config/connection');

require('../models/UserModel');
require('../models/CategoryModel');
require('../models/ProductModel');

require('../models/ImageProductModel');
require('../models/OptionsProductModel');
require('../models/AddressModel');
require('../models/PaymentModel');

require('../models/CategorysAndProductsModel');
require('../models/PurchaseModel');

connection.sync({ alter: true });
