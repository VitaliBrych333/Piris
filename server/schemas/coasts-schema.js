const mongoose = require('mongoose');
const { Types } = mongoose.Schema;

const coastsSchema = new mongoose.Schema({
  date: Types.Date,
  sum: Types.Number,
  type: Types.String,
  other: Types.String,
  author: Types.String,
});

module.exports = coastsSchema;
