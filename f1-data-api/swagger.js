const swaggerAutogen = require('swagger-autogen')()
const outputFile = './swagger.json'
const endpointsFiles = ['./src/api/circuit.js']

swaggerAutogen(outputFile, endpointsFiles)