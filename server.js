const express = require('express');
const PublicRoutes = require('./src/routes/publicRoutes')
const PrivateRoutes = require('./src/routes/privateRoutes')
require('dotenv').config()

const app = express();
app.use(express.json())

app.use(PublicRoutes)
app.use(PrivateRoutes)

app.listen(process.env.PORT, process.env.HOST, () => {
  console.log(`Servidor rodando em: http://${process.env.HOST}:${process.env.PORT}`)
})
