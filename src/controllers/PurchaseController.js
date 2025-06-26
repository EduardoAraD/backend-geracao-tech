const ImageProductModel = require("../models/ImageProductModel");
const ProductModel = require("../models/ProductModel");
const PurchaseModel = require("../models/PurchaseModel");
const PurchaseProductModel = require("../models/PurchaseProductModel");
const UserModel = require("../models/UserModel");

const { hidePartNumberEnd } = require("../utils/hidePartNumberEnd");

class PurchaseController {
  constructor() {
    PurchaseModel.associate({ UserModel, ProductModel, PurchaseProductModel })
  }

  async getPurchasesByUserId(request, response) {
    try {
      const { id } = request.params;

      const purchases = await PurchaseModel.findAll({
        include: [
          { model: ProductModel, as: 'products', include: ImageProductModel },
        ],
        where: {
          user_id: id
        }
      })

      return response.status(200).json({
        purchases: purchases.map(purchase => ({
          id: purchase.id,
          ref: purchase.ref,
          name_completed: purchase.name_completed,
          email: purchase.email,
          cpf: purchase.cpf,
          phone: purchase.phone,
          address: purchase.address,
          district: purchase.district,
          city: purchase.city,
          cep: purchase.cep,
          type_payment: purchase.type_payment,
          name_card: purchase.name_card,
          number_card: hidePartNumberEnd(purchase.number_card),
          products: purchase.products.map(item => ({
            id: item.id,
            name: item.name,
            slug: item.slug,
            price: item.price,
            price_with_discount: item.price_with_discount,
            images: item.ImageProductModels.map(img => img.path),
            quantity: item.PurchaseProductModel.quantity,
          })),
        }))
      });
    } catch (error) {
      return response.status(400).json({
        message: err.message
      })
    }
  }

  async getPurchaseByRef(request, response) {
    try {
      const { ref } = request.params;
    
      const purchase = await PurchaseModel.findOne({
        include: [
          { model: ProductModel, as: 'products', include: ImageProductModel },
          { model: UserModel, as: 'user' },
        ],
        where: { ref }
      });

      if(purchase === null) {
        return response.status(404).json({
          message: "Purchase not found!"
        })
      }

      return response.status(200).json({
        purchase: {
          id: purchase.id,
          ref: purchase.ref,
          name_completed: purchase.name_completed,
          email: purchase.email,
          cpf: purchase.cpf,
          phone: purchase.phone,
          address: purchase.address,
          district: purchase.district,
          city: purchase.city,
          cep: purchase.cep,
          type_payment: purchase.type_payment,
          name_card: purchase.name_card,
          number_card: hidePartNumberEnd(purchase.number_card),
          products: purchase.products.map(item => ({
            id: item.id,
            name: item.name,
            slug: item.slug,
            price: item.price,
            price_with_discount: item.price_with_discount,
            images: item.ImageProductModels.map(img => img.path),
            quantity: item.PurchaseProductModel.quantity,
          })),
        },
      })
    } catch (error) {
      return response.status(400).json({
        message: err.message
      })
    }
  }

  async create(request, response) {
    try {
      const { products, ...body } = request.body;

      const purchase = await PurchaseModel.create(body);

      const productList = products.map(item => ({ purchase_id: purchase.id, ...item }));
      await PurchaseProductModel.bulkCreate(productList);

      return response.status(201).json({
        message: "Compra realizada com sucesso!",
      })
    } catch (error) {
      return response.status(400).json({
        message: err.message
      })
    }
  }
}

module.exports = PurchaseController;
