const mongoose = require('mongoose')

const FormData = mongoose.Schema({
        fname:String,
        lname:String,
        number:Number,
        username:String,
        password:String,
        
});
module.exports= mongoose.model('admin', FormData)