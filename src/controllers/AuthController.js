const jwt = require('jsonwebtoken');
const UserModel = require("../models/UserModel");
const MD5 = require('crypto-js/md5');
require('dotenv').config()

class AuthController {
  async login(request, response) {
    try {
      const { email, password } = request.body;
      const passwordCrypto = MD5(password).toString()

      const data = await UserModel.findOne({ where: { email, password: passwordCrypto }})

      if(data !== null) {
        const exp = Math.floor(Date.now() / 1000) + (60 * 60 * 24); // 24h// 'Tempo de Expiração';
        const user = {
          id: data.id,
          firstname: data.firstname,
          surname: data.surname,
          email: data.email,
          cpf: data.cpf,
          phone: data.phone,
        }
        const token = jwt.sign({ user, exp }, process.env.APP_KEY_TOKEN);

        return response.status(200).json({
          token
        })
      }

      return response.status(404).json({
        message: "Login ou senha incorretos."
      })
    } catch (error) {
      return response.status(400).json({
        message: error.message
      })
    }
    
  }
}

module.exports = AuthController;
