const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: "Gaming API",
    description: "An API for a gaming website to connect users with games, platforms and mods.",
  },
  host: "three41final.onrender.com",
  schemes: ["https"],
  // host: 'localhost:8080',
  // schemes: ['http'],
}

const outputFile = './swagger.json';
const endpointsFiles = ['./routes/index.js'];

swaggerAutogen(outputFile, endpointsFiles, doc);

