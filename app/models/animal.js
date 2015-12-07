var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var animalSchema = new Schema({ name: String, jender: String, color: String, birthday: Date, description: String, photos: []});

module.exports = mongoose.model('Animal', animalSchema);