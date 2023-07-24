const express = require("express");
const app = express();
const port = 3000;
const swaggerUi = require('swagger-ui-express');
const swaggerFile = require('./swagger.json');

const circuits = require('./src/api/circuits');
const seasons = require('./src/api/seasons');
const races = require('./src/api/races');

app.use(express.json());
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerFile))

app.use('/api/f1', circuits);
app.use('/api/f1', seasons);
app.use('/api/f1', races);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
