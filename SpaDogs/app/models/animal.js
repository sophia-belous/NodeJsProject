var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var animalSchema = new Schema({ name: String});

module.exports = mongoose.model('Animal', animalSchema);