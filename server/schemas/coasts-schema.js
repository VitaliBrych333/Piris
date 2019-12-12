const mongoose = require('mongoose');
const { Types } = mongoose.Schema;

const coastsSchema = new mongoose.Schema({
    family: Types.String,
    name: Types.String,
    secondName: Types.String,
    dateBorn: Types.Date,

    seriaPasp: Types.String,
    numPasp: Types.Number,
    whoDone: Types.String,
    dateDone: Types.Date,
    idPasp: Types.String,

    placeBorn: Types.String,
    city: Types.String,
    adress: Types.String,
    telHouse: Types.String,
    telMob: Types.String,
    email: Types.String,

    placeWork: Types.String,
    position: Types.String,
    cityReg: Types.String,
    statusFam: Types.String,
    national: Types.String,
    inval: Types.String,
    retiree: Types.String,
    sum: Types.Number,
});

module.exports = coastsSchema;
