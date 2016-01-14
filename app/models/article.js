var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var articleSchema = new Schema({ title: String, 
								date: Date, 
								shortDesc: String, 
								description: String, 
								photo: [] });

module.exports = mongoose.model('Article', articleSchema);