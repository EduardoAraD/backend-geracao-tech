const express = require('express');
const cors = require('cors')
const PublicRoutes = require('./routes/publicRoutes');
const PrivateRoutes = require('./routes/privateRoutes');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('../swagger.json');
require('dotenv').config()

const app = express();
app.use(express.json());
app.use(cors());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use(PublicRoutes)
app.use(PrivateRoutes)

app.listen(process.env.PORT ?? 4000, () => {
  console.log(`Servidor rodando ...`)
})
