const {Router} = require('express');
const mongoose = require('mongoose');
const Joi = require('joi');
const auth = require('../middlewares/auth');
const {RegisterBook, validateBookRegister} = require('../models/book');
const {RegisterUser} = require('../models/register');
const _ = require('lodash');
const fs = require('fs');


const api = Router();
api.post('/Book',auth, async (req,res)=>{
      //console.log(req.file);
      //console.log((req.body));
      const {error} = validateBookRegister(req.body);
      if(error) return res.status(400).send(error.details[0].message);

      let book = new RegisterBook(_.pick(req.body, ['BookName','Genre','Cost']));
      book.UserId = req.user._id;

      let modBook = await RegisterUser.findById(req.user._id);
      modBook.books.push(book);
      const path = `${__dirname}/../uploads/${req.user._id}${req.body.BookName}.jpg`;
      fs.writeFile(path, new Buffer(req.body.Images, "base64"), function(err) {});
    
      book.Images=req.user._id+req.body.BookName+".jpg";
      modBook.save();
     const success = await book.save();
      if(success) res.status(200).send('Book Successfully saved');

    
});

module.exports = api;