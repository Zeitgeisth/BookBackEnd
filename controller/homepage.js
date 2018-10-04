const {Router} = require('express');
const auth = require('../middlewares/auth');
const {RegisterBook} = require('../models/book');
const api = Router();

api.get('/All', auth, async(req,res)=>{
     const rand = Math.floor(Math.random()*(3)-1);
     console.log(rand);
     let books = await RegisterBook.find().sort({BookName:rand});
     console.log(books);
     res.send(books);
});

module.exports = api;
