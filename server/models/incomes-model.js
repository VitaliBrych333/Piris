const mongoose = require('mongoose');
const incomesSchema = require('../schemas/incomes-schema');

const incomesModel = mongoose.model('incomes', incomesSchema, 'incomes');

module.exports = incomesModel;
