const {  Adduser, Getuser, Updatefeedback, Deletefeedback } = require ('./Fcontroller');

const express = require('express');

const Controller = require('./Fcontroller');

const route = express.Router();

route.post('/addFdata', Adduser);

route.get('/getFdata', Getuser);

route.delete('/deleteFdata/:_id', Deletefeedback);

route.put('/updateFdata/:_id', Updatefeedback);

module.exports= route