const mongoose = require("mongoose");

const recordSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },

    amount: {
      type: Number,
      required: true,
      min: [0, "Amount must be positive"],
    },

    type: {
      type: String,
      enum: ["income", "expense"],
      required: true,
    },

    category: {
      type: String,
      required: true,
      trim: true,
      maxlength: 50,
    },

    date: {
      type: Date,
      default: Date.now,
    },

    note: {
      type: String,
      trim: true,
      maxlength: 200,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Record", recordSchema);