const PaymentModel = require("../models/PaymentModel");
const UserModel = require("../models/UserModel");

class PaymentController {
  constructor() {
    PaymentModel.associate({ UserModel });
  }

  async getPaymentByUserId(request, response) {
    const { id } = request.params;

    const payment = await PaymentModel.findOne({
      include: UserModel,
      where: {
        [UserModel.id]: id
      }
    })

    return response.json({
      payment
    })
  }

  async create(request, response) {
    const body = request.body;

    const payment = await PaymentModel.create(body);

    return response.json({
      message: "Metodo de Pagamento criado com sucesso",
      payment,
    })
  }

  async update(request, response) {
    const { id } = request.params;

    const payment = await PaymentModel.update(body, { where: { id } })

    return response.json({
      message: "Metodo de Pagamento alterado com sucesso",
      payment,
    })
  }

  async remove(request, response) {
    const { id } = request.params;

    await PaymentModel.destroy({ where: { id } });

    return response.json({
      message: "Metodo de Pagamento deletado com sucesso",
    })
  }
}

module.exports = PaymentController;
