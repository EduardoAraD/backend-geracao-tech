const MD5 = require('crypto-js/md5');
const UserModel = require("../models/UserModel")

class UserController {

  async getById(request, response) {
    const { id } = request.params

    const user = await UserModel.findOne({
      where: { id },
    })
    if(user === null) {
      return response.status(404).json({
        message: "Usuário não encontrado!"
      })
    }

    return response.status(200).json({
      user
    })
  }

  async create(request, response) {
    try {
      const { password, confirmPassword, ...body } = request.body;

      if(password !== confirmPassword) {
        return response.status(400).json({
          message: "Senha e Confirmação de senha diferentes."
        })
      }

      const passwordCrypto = MD5(password).toString();

      await UserModel.create({ ...body, password: passwordCrypto });

      return response.status(201).json({
        message: "Usuário criado com sucesso"
      })
    } catch (err) {
      return response.status(400).json({
        message: err.message
      })
    }
  }

  async update(request, response) {
    try {
      const { id } = request.params
      const body = request.body;

      await UserModel.update(body, {
        where: { id }
      })

      return response.status(204).json({
        message: "Usuário alterado com sucesso"
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

      await UserModel.destroy({ where: { id }});

      return response.status(204).json({
        message: "Usuário removido com sucesso"
      })
    } catch (error) {
      return response.status(400).json({
        message: err.message
      })
    }
  }
}

module.exports = UserController