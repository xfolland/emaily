const mongoose = require("mongoose");
const { Schema } = mongoose;
const RecipientSchema = require("./Recipient");

const surveySchema = new Schema({
  author: { type: Schema.Types.ObjectId, ref: "User" },
  title: { type: String },
  subject: { type: String },
  body: { type: String },
  recipients: { type: [RecipientSchema] },
  dateSent: { type: Date },
  lastResponse: { type: Date },
  yes: { type: Number, default: 0 },
  no: { type: Number, default: 0 },
});

mongoose.model("surveys", surveySchema);
