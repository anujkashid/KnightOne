const {  Adduser, Login, Getuser, GetuserById, Deleteuser, Updateuser } = require ('./Rcontroller')

const express = require('express');
const router = express.Router();
const Controller = require('./Rcontroller');

const RauthMiddleware = require('./RauthMiddleware');

const route = express.Router()

// registration page API
route.post('/addRdata', Adduser);

route.post('/loginauth', Login);

route.get('/getRdata', Getuser);

route.get('/getRdataone/:_id', GetuserById);

route.delete('/deleteRdata/:_id', Deleteuser);

route.put('/updateRdata/:_id', Updateuser);

router.get('/data', RauthMiddleware, (req, res) => {
    // You can access the student ID from `req.student` if needed
    res.json({ msg: 'Protected data for authenticated students', userId: req.user });
});

module.exports= route