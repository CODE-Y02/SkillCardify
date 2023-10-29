const mongoose = require("mongoose");

const profileSchema = new mongoose.Schema(
  {
    personalDetails: {
      dateOfBirth: {
        type: Date,
        required: true,
      },
      address: {
        country: {
          type: String,
          required: true,
        },
        city: {
          type: String,
          required: true,
        },
        pincode: {
          type: Number,
          required: true,
        },
        line1: {
          type: String,
          required: true,
        },
        line2: String,
        line3: String,
      },
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Profile", profileSchema);
