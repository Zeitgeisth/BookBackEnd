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
      const {error} = validateBookRegister(req.body);
      if(error) return res.status(400).send(error.details[0].message);

      let book = new RegisterBook(_.pick(req.body, ['BookName','Genre','Cost','Description']));
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

api.put('/EditBook',auth, async (req, res)=>{
     const {error} = validateBookRegister(req.body);
     if(error) return res.status(400).send(error.details[0].message);

     let book = RegisterBook.findById(req.body.id);
     console.log(book);
     const delpath = `${__dirname}/../uploads/${req.user._id}${book.BookName}.jpg`;
     fs.unlink(delpath, function(err){});
     
     book.BookName = req.body.BookName;
     book.Genre = req.body.Genre;
     book.Cost = req.body.Cost;
     book.Description = req.body.Description;

     const path = `${__dirname}/../uploads/${req.user._id}${req.body.BookName}.jpg`;
     fs.writeFile(path, new Buffer(req.body.Images, "base64"), function(err) {});

     book.Images=req.user._id+req.body.BookName+".jpg";
     const success = await book.save();
      if(success) res.status(200).send('Book Edited saved'); 


});

 api.post('/Favourites',auth, async(req,res)=>{
       const book = await RegisterBook.findById(req.body.id);
       let exist = false;
       let user = await RegisterUser.findById(req.user._id);
       const totalfav = user.favouriteBooks;
       for(let i = 0; i<totalfav.length; i++){
            if(totalfav[i] == req.body.id) exist = true;
       }
       if(exist) {
            res.status(400).send("Favourites is already listed");
       } 

       else{
            user.favouriteBooks.push(book);
            book.UserFav = req.user._id;
            book.save();
            const success = user.save();

            if(success) res.status(200).send("Favourites saved");

       }

       
 });

module.exports = api;