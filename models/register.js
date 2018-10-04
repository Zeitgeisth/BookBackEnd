const mongoose = require('mongoose');
const Joi = require('joi');
const jwt = require('jsonwebtoken');
const config = require('config');
const {RegisterBook} = require('../models/book');

const RegisterSchema = new mongoose.Schema({
    firstName: {
        type:String,
        required:true
    },
    middleName: {
        type:String
    },
    lastName:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        required:true
    },
    phone:{
        type:String,
        required:true,
    },
    dob:{
        type:String,
        required:true
    },
    gender:{
        type:String,
        required:true
    },
    books:[{
        type:mongoose.Schema.Types.ObjectId, ref:RegisterBook
    }]
});

RegisterSchema.methods.generateAuthToken = function(){
    const token = jwt.sign({_id: this._id}, config.get('jwtPrivateKey'));
    return token;
}


const RegisterUser = mongoose.model('Register', RegisterSchema);

function validateRegister(user){
    const schema = {
        firstName: Joi.string().min(3).max(30).required(),
        middleName: Joi.string().min(3).max(30),
        lastName: Joi.string().min(3).max(30).required(),
        email: Joi.string().min(5).max(30).required().email(),
        password: Joi.string().min(5).max(300).required(),
        phone: Joi.number().integer().required(),
        dob: Joi.string().required(),
        gender: Joi.string().required()
    };
    return Joi.validate(user, schema);
}

module.exports.RegisterUser = RegisterUser;
module.exports.validateRegister = validateRegister;