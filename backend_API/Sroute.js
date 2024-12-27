const {  Addservices, Getservices, Deleteservice, Updateservice } = require ('./Scontroller')

const express = require('express');

const Controller = require('./Scontroller')

//multer file
const { photoUpload1 } = require('./Fileupload');

const route = express.Router()


route.post('/addSdata', photoUpload1, Addservices);

route.get('/getSdata', Getservices);

route.delete('/deleteSdata/:_id', Deleteservice );

route.put('/updateSdata/:_id', photoUpload1, Updateservice );

module.exports= route;