const mongoose = require('mongoose');

const Plan = mongoose.Schema({
    
            name:String,
            desc1:String,
            desc2:String,
            desc3:String,
            desc4:String,
            desc5:String,
            desc6:String,
            desc7:String,
            price:Number,
});
module.exports= mongoose.model('Plans', Plan)