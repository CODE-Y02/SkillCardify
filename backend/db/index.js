const mongoose = require("mongoose");

const password = process.env.MONGO_PASS;
const user = process.env.MONGO_USER;
const db = process.env.MONGO_DB;

const connect = async () => {
  try {
    const conn = await mongoose.connect(
      `mongodb+srv://${user}:${password}@cluster0.ufnamwr.mongodb.net/${db}?retryWrites=true&w=majority`,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    );
    console.log("MongoDB connected");
    return conn;
  } catch (error) {
    console.log("MongoDB Disconnected", JSON.stringify(error));
    process.exit();
  }
};

module.exports = connect;
