var mongoose = require('mongoose');

var keywordSchema = new mongoose.Schema({
	tag: { type: String, required: true, unique: true },
});

keywordSchema.pre('save', function(next){
  next();
});

keywordSchema.index({ tag: 'text'});

module.exports = mongoose.model('Keyword', keywordSchema);