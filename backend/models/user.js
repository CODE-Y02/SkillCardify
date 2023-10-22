const { Schema, model } = require("mongoose");

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    index: true,
  },
  password: {
    type: String,
    required: true,
    validate: {
      validator: function (v) {
        // Ensure the password is at least 8 characters long and contains at least one alphanumeric character
        return /^(?=.*[A-Za-z0-9]).{8,}$/.test(v);
      },
      message:
        "Password must be at least 8 characters long and contain at least one alphanumeric character.",
    },
  },
  mobile: {
    type: String,
  },
  userAccess: {
    type: String,
    default: "user",
    enum: ["user", "admin", "developer"],
  },
});

module.exports = model("User", userSchema);
