const bcrypt = require("bcrypt");

exports.encrypt = async (password) => {
  try {
    const saltRounds = 10;

    const hash = await bcrypt.hash(password, saltRounds);
    return hash;
  } catch (error) {
    console.log("ERR in service.password.encrypt ");
    return error;
  }
};

exports.verify = async (myPlaintextPassword, hash) => {
  return await bcrypt.compare(myPlaintextPassword, hash);
};
