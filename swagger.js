const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: "My API",
    description: "Contact API",
  },
  host: "three41final.onrender.com",
  schemes: ["https"],
  // host: 'localhost:8080',
  // schemes: ['http'],
}

const outputFile = './swagger.json';
const endpointsFiles = ['./routes/index.js'];

swaggerAutogen(outputFile, endpointsFiles, doc);

