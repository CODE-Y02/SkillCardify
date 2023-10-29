require("dotenv").config();
const express = require("express");
const connect = require("./db");

const PORT = process.env.PORT || 3000;
const app = express();

app.use("/", (req, res) => {
  res.status(404).json({ success: false, message: "Page Not Found " });
});

const startApp = async () => {
  try {
    await connect();
    app.listen(PORT, () => {
      console.log(`server is running at  ${PORT} \n`);
    });
  } catch (error) {
    console.log("\n");
    console.log(JSON.stringify({ errorMsg: error.message, error }));
  }
};

startApp();
