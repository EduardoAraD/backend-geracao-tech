const express = require('express');
require('dotenv').config()

const app = express();
app.use(express.json())


app.listen(process.env.PORT, process.env.HOST, () => {
  console.log(`Servidor rodando em: http://${process.env.HOST}:${process.env.PORT}`)
})
