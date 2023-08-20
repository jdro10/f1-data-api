const swaggerAutogen = require("swagger-autogen")();
const outputFile = "./swagger.json";
const endpointsFiles = ["./src/api/circuits.js", "./src/api/races.js", "./src/api/seasons.js", "./src/api/results.js"];

swaggerAutogen(outputFile, endpointsFiles);
