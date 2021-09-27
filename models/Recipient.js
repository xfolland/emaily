const mongoose = require("mongoose");
const { Schema } = mongoose;

const recipientSchema = new Schema({
  email: { type: String },
  responsed: { type: Boolean, default: false },
});

module.exports = recipientSchema;
