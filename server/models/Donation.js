var mongoose = require('mongoose');

var donationSchema = new mongoose.Schema({
    from: { type: Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
    to:{ type: Schema.Types.ObjectId, ref: 'Cause', required: true, unique: true },
    amount: {type:Number, required:true}
});

keywordSchema.pre('save', function(next){
  next();
});

donationSchema.index({ tag: 'text'});

module.exports = mongoose.model('Donation', donationSchema);