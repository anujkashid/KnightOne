const { Addproduct, Getproduct, GetproductById, Deleteproduct, Updateproduct } = require('./Product_controller');
const express = require('express');

//multer file
const { photoUpload } = require('./Fileupload');
const route = express.Router();

route.post('/addproductdata', photoUpload, Addproduct);

route.get('/getproductdata', Getproduct);

route.get('/getproductdataone/:_id', GetproductById);

route.delete('/deleteproductdata/:_id', Deleteproduct);

route.put('/updateproductdata/:_id', photoUpload, Updateproduct);

module.exports = route;
