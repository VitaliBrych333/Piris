const mongoose = require('mongoose');
const coastsSchema = require('../schemas/coasts-schema');

const coastsModel = mongoose.model('coasts', coastsSchema, 'purchases');

module.exports = coastsModel;
