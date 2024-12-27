const mongoose = require('mongoose')

const ServicesData = mongoose.Schema({
    title:String,
    desc:String,
    icon:String,
});
module.exports= mongoose.model('services', ServicesData)