var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var commentSchema = new Schema({ email: String, 
								name: String, 
								content: String, 
								date: Date, 
								answer: String });

module.exports = mongoose.model('Comment', commentSchema);