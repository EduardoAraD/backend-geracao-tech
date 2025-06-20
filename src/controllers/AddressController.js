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

      return response.json({
        address
      })
    } catch (error) {
      return response.status(400).json({
        message: "Endereço não encontrado!"
      })
    }
  }

  async create(request, response) {
    const body = request.body;

    const address = await AddressModel.create(body);

    return response.json({
      message: "Endereço criado com sucesso",
      address,
    })
  }

  async update(request, response) {
    const { id } = request.params;

    const address = await AddressModel.update(body, { where: { id } })

    return response.json({
      message: "Endereço alterado com sucesso",
      address,
    })
  }

  async remove(request, response) {
    const { id } = request.params;

    await AddressModel.destroy({ where: { id } });

    return response.json({
      message: "Endereço deletado com sucesso",
    })
  }
}

module.exports = AddressController;
