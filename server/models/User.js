var mongoose = require('mongoose');
 
var User = new mongoose.Schema({
    email: {
        type: String,
        required: '{PATH} is required!',
        unique:true
    },
    username: {
        type: String,
        required: '{PATH} is required!',
        unique:true
    },
    password: String,
    type: {
        type: String,
        enum : ['Donor','Charity','Admin'],
        default: 'Donor'
    },
});
 
module.exports = mongoose.model('User', User);