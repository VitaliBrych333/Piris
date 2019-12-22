const mongoose = require('mongoose');
const recordsSchema = require('../schemas/records-schema');

const recordsModel = mongoose.model('records', recordsSchema, 'records');

module.exports = recordsModel;
