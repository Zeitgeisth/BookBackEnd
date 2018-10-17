const {Router} = require('express');
const {RegisterBook} = require('../models/book');
const auth = require('../middlewares/auth');
const {RegisterUser} = require('../models/register');
const fs = require('fs');

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
});

api.post('/DeleteBook', auth, async(req, res)=>{
    const book = await RegisterBook.findByIdAndDelete(req.body.id);
    const delpath = `${__dirname}/../uploads/${book.Images}`;
    fs.unlink(delpath, function(err){});
    const userID = book.UserId;
    const favID = book.UserFav;

    const update = await RegisterUser.findByIdAndUpdate(userID, {$pull: {books:req.body.id}});

    let updateagain;
    for (let i=0 ; i<favID.length ; i++){
        let favourite = favID[i];
         updateagain = await RegisterUser.findByIdAndUpdate(favourite,{$pull: {favouriteBooks:req.body.id}});
    }

    if(book || update || updateagain) res.send('Delete Successful');

});

api.post('/removeFav', auth, async(req, res)=>{
    console.log(req.user.id);
     const success1 = await RegisterUser.findByIdAndUpdate(req.user._id,{$pull: {favouriteBooks:req.body.id}});

     const success2 = await RegisterBook.findByIdAndUpdate(req.body.id, {$pull: {UserFav:req.user._id}});
     if(success1 || success2) res.status(200).send('Favourite removed');
});



module.exports = api;