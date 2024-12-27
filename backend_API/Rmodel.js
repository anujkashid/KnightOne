const mongoose = require('mongoose')

const FormData = mongoose.Schema({
        fname:String,
        lname:String,
        mnumber:String,
        gender:String,
        username:String,
        city:String,
        state:String,
        zip:Number,
        address:String,
        password:String,

});
module.exports= mongoose.model('registration', FormData)