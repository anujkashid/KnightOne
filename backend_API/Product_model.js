const mongoose = require('mongoose');

const ProductData = mongoose.Schema({
    image: String,
    pname: String,
    price: Number,
    color: Object, 
    size: Object,  
    rating: Number,
});

module.exports = mongoose.model('products', ProductData);
