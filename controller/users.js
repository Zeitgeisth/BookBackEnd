const {Router} = require('express');
const auth = require('../middlewares/auth');
const {RegisterUser} = require('../models/register');

const api = Router();

api.get('/me', auth, async( req, res)=>{
    const user = await RegisterUser.findById(req.user._id).select('-password');
    console.log(user);
    res.send(user);
});

api.post('/user', auth, async(req, res)=>{
    const user = await RegisterUser.findById(req.body.userId).select('-password -books');
    console.log(user);
    res.send(user);
});

module.exports = api;
