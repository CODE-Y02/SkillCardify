const mongoose = require("mongoose");


const password = process.env.MONGO_PASS;
const user = process.env.MONGO_USER;
const db = process.env.MONGO_DB;

const connect = async () => {
  try {
    await mongoose.connect(URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    return 1;
  } catch (error) {
    console.log("MongoDB Disconnected", error);
    process.exit();
  }
};

module.exports = connect;
