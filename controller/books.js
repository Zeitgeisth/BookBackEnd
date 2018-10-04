const {Router} = require('express');
const {RegisterBook} = require('../models/book');
const auth = require('../middlewares/auth');

const api = Router();
api.post('/book', auth, async (req,res)=>{
    const books = await RegisterBook.find({UserId:req.body.UserId});
    console.log(books);
    res.send(books);
});

module.exports = api;