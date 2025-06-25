const PaymentModel = require("../models/PaymentModel");
const UserModel = require("../models/UserModel");

class PaymentController {
  constructor() {
    PaymentModel.associate({ UserModel });
  }

  async getPaymentByUserId(request, response) {
    try {
      const { id } = request.params;

      const payment = await PaymentModel.findOne({ where: { user_id: id } })

      return response.status(200).json({
        payment
      })
    } catch (error) {
      return response.status(400).json({
        message: "Medoto de Pagamento não encontrado!"
      })
    }
  }

  async create(request, response) {
    try {
      const body = request.body;

      const payment = await PaymentModel.create(body);

      return response.status(201).json({
        message: "Metodo de Pagamento criado com sucesso",
        payment,
      })
    } catch (error) {
      return response.status(400).json({
        message: err.message
      })
    }
  }

  async update(request, response) {
    try {
      const { id } = request.params;

      const payment = await PaymentModel.update(body, { where: { id } })

      return response.status(204).json({
        message: "Metodo de Pagamento alterado com sucesso",
        payment,
      })
    } catch (error) {
      return response.status(400).json({
        message: err.message
      })
    }
  }

  async remove(request, response) {
    try {
      const { id } = request.params;

      await PaymentModel.destroy({ where: { id } });

      return response.status(204).json({
        message: "Metodo de Pagamento deletado com sucesso",
      })
    } catch (error) {
      return response.status(400).json({
        message: err.message
      })
    }
  }
}

module.exports = PaymentController;
