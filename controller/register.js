const express = require('express');
const {validateRegister, RegisterUser} = require('../models/register');
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const _ =  require('lodash');


const api = express.Router();

api.post('/newUser', async (req,res)=>{
        const {error} = validateRegister(req.body);
        if(error) return res.status(400).send(error.details[0].message);
        
           
       let user  =await  RegisterUser.findOne({email: req.body.email});
       if (user) return res.status(400).send('email already used');

        user  =await  RegisterUser.findOne({phone: req.body.phone});
       if (user) return res.status(400).send('phone already used');

        let newUserRegister = new RegisterUser({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            password: req.body.password,
            email: req.body.email,
            phone:req.body.phone,
            location:req.body.location
           
        });
         const salt = await bcrypt.genSalt(10);
         newUserRegister.password = await bcrypt.hash(req.body.password, salt);
          const saveDb =  await newUserRegister.save();
        
        
          const token = newUserRegister.generateAuthToken();
          res.header('x-auth-token',token).status(200).send('Successfully created new account');
        

});

module.exports = api;