var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var photoSchema = new Schema({
								img: String,
								title: String,
								text: String
							});

module.exports = mongoose.model('Photo', photoSchema);