const AddressModel = require("../models/AddressModel");
const ImageProductModel = require("../models/ImageProductModel");
const PaymentModel = require("../models/PaymentModel");
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
    const { products, ...body } = request.body;

    const purchase = await PurchaseModel.create(body);

    const productList = products.map(item => ({ purchase_id: purchase.id, ...item }));
    await PurchaseProductModel.bulkCreate(productList);

    return response.json({
      message: "Compra realizada com sucesso!",
    })
  }

  async getPurchaseByRef(request, response) {
    const { ref } = request.params;
    
    const purchase = await PurchaseModel.findOne({
      include: [
        { model: ProductModel, as: 'products', include: ImageProductModel },
        { model: UserModel, as: 'user' },
      ],
      where: { ref }
    });

    return response.json({
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

    // return response.json({
    //   purchase: {
    //     id: purchase.id,
    //     ref: purchase.ref,
    //     type_payment: purchase.type_payment,
    //     user: purchase.user,
    //     products: purchase.products.map(item => ({
    //       id: item.id,
    //       name: item.name,
    //       slug: item.slug,
    //       price: item.price,
    //       price_with_discount: item.price_with_discount,
    //       images: item.ImageProductModels.map(img => img.path),
    //       quantity: item.PurchaseProductModel.quantity,
    //     })),
    //     address: {
    //       address: address.address,
    //       cep: address.cep,
    //       city: address.city,
    //       complement: address.complement,
    //       district: address.district,
    //     },
    //     payment: {
    //       name: payment.name,
    //       number: hidePartNumberEnd(payment.number),
    //     }
    //   },
    // })
  }
}

module.exports = PurchaseController;
