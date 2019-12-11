const mongoose = require('mongoose');
const { Types } = mongoose.Schema;

const incomesSchema = new mongoose.Schema({
  date: Types.Date,
  sum: Types.Number,
  who: Types.String,
  type: Types.String,
  other: Types.String,
  author: Types.String,
});

module.exports = incomesSchema;
