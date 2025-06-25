const jwt = require('jsonwebtoken');
require('dotenv').config()

function validateToken(request, response, next) {
  const tokenString = request.headers.token;

  if(tokenString) {
    const isValidateToken = tokenString.includes('Bearer ');
    if(!isValidateToken) {
      return response.status(401).json({
        message: "Não Autorizado."
      })
    }
    const token = tokenString.split(' ')[1];

    try {
      jwt.verify(token, process.env.APP_KEY_TOKEN);

      return next();
    } catch (error) {
      return response.status(401).json({
        message: "Não Autorizado."
      })
    }
  }

  return response.status(401).json({
    message: "Não Autorizado."
  })
}

module.exports = validateToken;
