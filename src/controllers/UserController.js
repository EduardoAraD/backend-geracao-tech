const MD5 = require('crypto-js/md5');
const UserModel = require("../models/UserModel")

class UserController {

  async getById(request, response) {
    const { id } = request.params

    const user = UserModel.findOne({
      where: { id: id },
      attributes: ['firstname', 'username', 'email']
    })
    if(user === null) {
      return response.json({
        message: "Usuário não encontrado!"
      })
    }

    return response.status(200).json({
      user
    })
  }

  async create(request, response) {
    const { password, ...body } = request.body;

    const passwordCrypto = MD5(password).toString();

    await UserModel.create({ ...body, password: passwordCrypto });

    return response.status(201).json({
      message: "Usuário criado com sucesso"
    })
  }

  async update(request, response) {
    const { id } = request.params
    const body = request.body;

    await UserModel.update(body, { where: { id }})

    return response.json({
      message: "Usuário alterado com sucesso"
    })
  }

  async remove(request, response) {
    const { id } = request.params;

    await UserModel.destroy({ where: { id }});

    return response.json({
      message: "Usuário removido com sucesso"
    })
  }
}

module.exports = UserController