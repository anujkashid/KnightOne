const mongoose = require('mongoose');

const UserFeedback = mongoose.Schema({
    Name:String,
    Email:String,
    Subject:String,
    Message:String,
});
module.exports= mongoose.model('Feedbacks', UserFeedback)