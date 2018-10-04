const mongoose = require('mongoose');
const joi = require('joi');
const {RegisterUser} = require('../models/register');

const BookSchema = new mongoose.Schema({
    BookName:{
        type:String,
        required:true
    },
    Genre:{
       type:String,
       required:true
    },
    Cost:{
        type:String,
        required:true
    },
    Images:{
        type:String,
        required:true
    },
    UserId:{type:mongoose.Schema.Types.ObjectId, ref: 'RegisterUser'}
   
});

const RegisterBook = mongoose.model('RegisterBook',BookSchema);

function validateBookRegister(user){
    const schema = {
        BookName:joi.string().min(3).max(20).required(),
        Genre:joi.string().min(3).max(20).required(),
        Cost:joi.string().min(3).max(10).required(),
        Images:joi.string()
    }
    return joi.validate(user,schema);

}

module.exports.RegisterBook = RegisterBook;
module.exports.validateBookRegister = validateBookRegister;