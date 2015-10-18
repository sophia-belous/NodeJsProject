var mongoose = require('mongoose');
var animalSchema = new Schema({ name: String, type: String });

var Animal = mongoose.model('Animal', animalSchema);
var dog = new Animal({ type: 'dog' })
module.exports = dog;