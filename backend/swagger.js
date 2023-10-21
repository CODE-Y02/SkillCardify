// swagger.js

import swaggerJSDoc from "swagger-jsdoc";

const options = {
  definition: {
    openapi: "3.0.0", // Version of Swagger/OpenAPI
    info: {
      title: "Your API Title",
      version: "1.0.0",
      description: "Your API Description",
    },
  },
  apis: ["./routes/*.js"],
};

const swaggerSpec = swaggerJSDoc(options);

export default swaggerSpec;
