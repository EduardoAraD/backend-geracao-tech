const AddressModel = require("../models/AddressModel");
const UserModel = require("../models/UserModel");

class AddressController {
  constructor() {
    AddressModel.associate({ UserModel });
  }

  async getAddressByUserId(request, response) {
    try {
      const { id } = request.params;

      const address = await AddressModel.findOne({ where: { user_id: id }})

      return response.status(200).json({
        address
      })
    } catch (error) {
      return response.status(400).json({
        message: "Endereço não encontrado!"
      })
    }
  }

  async create(request, response) {
    try {
      const body = request.body;

      const address = await AddressModel.create(body);

      return response.status(201).json({
        message: "Endereço criado com sucesso",
        address,
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

      const address = await AddressModel.update(body, { where: { id } })

      return response.status(204).json({
        message: "Endereço alterado com sucesso",
        address,
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

      await AddressModel.destroy({ where: { id } });

      return response.status(204).json({
        message: "Endereço deletado com sucesso",
      })
    } catch (error) {
      return response.status(400).json({
        message: err.message
      })
    }
  }
}

module.exports = AddressController;
