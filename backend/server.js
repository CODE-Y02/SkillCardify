const express = require("express");
const dotenv = require("dotenv");
dotenv.config();

const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./swagger.js");
const connect = require("./db");

const usersRoute = require("./routes/user.js");

const app = express();

app.use(express.json());

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use("/users", usersRoute);

app.use("/", (req, res) => {
  res.status(404).json({ success: false, message: "Page Not Found " });
});

const startApp = async () => {
  try {
    await connect();
    app.listen(process.env.PORT || 3000, () => {
      console.log(`server is running at  ${process.env.PORT || 3000} PORT \n`);
    });
  } catch (error) {
    console.log("\n");
    console.log(JSON.stringify({ errorMsg: error.message, error }));
  }
};

startApp();
