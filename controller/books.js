const {Router} = require('express');
const {RegisterBook} = require('../models/book');
const auth = require('../middlewares/auth');

const api = Router();
api.post('/book', auth, async (req,res)=>{
    const books = await RegisterBook.find({UserId:req.body.UserId});
    console.log(books);
    res.send(books);
});

api.get('/myBook', auth, async(req, res)=>{
    const books = await RegisterBook.find({UserId:req.user._id});
    res.send(books);
});

api.get('/myFav', auth, async(req, res)=>{
    const books = await RegisterBook.find({UserFav:req.user._id});
    res.send(books);
})

module.exports = api;