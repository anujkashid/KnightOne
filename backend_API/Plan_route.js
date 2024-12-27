const {  Addplan, Getplan, Deleteplan, Updateplan} = require ('./Plan_controller')

const express = require('express');

const Controller = require('./Plan_controller')

const route = express.Router()

// registration page API
route.post('/addplan', Addplan);

route.get('/getplan', Getplan);

route.delete('/deleteplan/:id', Deleteplan );

route.put('/updateplan/:_id', Updateplan );

module.exports= route