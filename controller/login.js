const mongoose = require('mongoose');
const {Router} = require('express');
const {validateRegister, RegisterUser} = require('../models/register');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Joi = require('joi');
const config = require('config');
const _ = require('lodash');
const auth = require('../middlewares/auth');

const api = Router();

api.post('/User', async (req, res)=>{
       const {error} = validateUser(req.body);
       if(error) return res.status(400).send(error.details[0].message);
     const user = await RegisterUser
       .findOne()
       .or([{email:req.body.email},{phone:req.body.email}]);
     if(!user){
        return res.status(400).send("Details doesn't exist or match");
     }
     const validPassword = await bcrypt.compare(req.body.password, user.password);
     if(!validPassword) return res.status(400).send("Details doesn't exist or match");

     const token = user.generateAuthToken();
     
     res.status(200).send(token);
       
});
const validateUser = function(user){
  const Schema = {
      email : Joi.string().min(5).max(50),
      phone: Joi.number().integer(),
      password: Joi.string().min(5).max(500)
  }
  return Joi.validate(user, Schema);
}

module.exports = api;