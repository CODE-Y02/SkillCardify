import express from "express";
import dotenv from "dotenv";
import swaggerUi from "swagger-ui-express";
import swaggerSpec from "./swagger.js";
import { connect } from "./db/dbconfig.js";
dotenv.config();

const app = express();

app.use(express.json());

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

/**
 * @tag users
 * GET /users
 */
app.use("/users");

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
