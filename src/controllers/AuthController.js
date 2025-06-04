const jwt = require('jsonwebtoken');
const UserModel = require("../models/UserModel");
require('dotenv').config()

class AuthController {
  async login(request, response) {
    const { email, password } = request.body;

    const data = await UserModel.findOne({ where: { email, password }})

    if(data !== null) {
      const exp = Math.floor(Date.now() / 1000) + (60 * 60 * 24); // 24h// 'Tempo de Expiração';
      const user = {
        firstname: data.firstname,
        surname: data.surname,
        email: data.email,
      }
      const token = jwt.sign({ user, exp }, process.env.APP_KEY_TOKEN);

      return response.json({
        token
      })
    }

    return response.json({
      message: "Login ou senha incorretos."
    })
  }
}

module.exports = AuthController;
