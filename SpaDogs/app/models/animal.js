var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var animalSchema = new Schema({ name: String, photos: []});

module.exports = mongoose.model('Animal', animalSchema);