const ProductModel = require("../models/ProductModel");
const PurchaseModel = require("../models/PurchaseModel");
const UserModel = require("../models/UserModel");

class PurchaseController {
  constructor() {
    PurchaseModel.associate({ UserModel, ProductModel })
  }

  async getPurchasesByUserId(request, response) {
    const { id } = request.params;

    const purchases = await PurchaseModel.findAll({
      include: [UserModel, ProductModel],
      where: {
        [UserModel.id]: id
      }
    })

    return response.json({
      purchases
    })
  }

  async create(request, response) {
    const body = request.body;

    await PurchaseModel.create(body);

    return response.json({
      message: "Compra realizada com sucesso!",
    })
  }
}

module.exports = PurchaseController;
