const express = require("express");
const router = express.Router();

// Create

const Schema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  account_created: {
    type: Date,
    default: Date.now,
  },
  accounts: [
    {
      title: {
        type: String,
        required: true,
      },
      desc: {
        type: String,
      },
      amount: {
        type: Number,
        required: true,
      },
      transfer_type: {
        type: Boolean,
        required: true,
      },
    },
  ],
});

// Delete Note

// Update Note

// Read Note
