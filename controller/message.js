const {Router} = require('express');
const {Chat} = require('../models/chat');
const auth = require('../middlewares/auth');

const api = Router();

api.post('/message',auth, async(req,res)=>{
    const msg = await Chat.find({registerId:req.body.ID});
    res.status(200).send(msg);
});

api.post('/getOneMessage',auth, async(req,res)=>{
    console.log(req.body.room);
   const msg = await Chat.find({"Room.RoomId":req.body.room});
   console.log(msg);
   const count = await Chat.find({"Room.RoomId":req.body.room}).count();
   console.log(count);
   if(count==0){
    console.log('Empty Chat');
    return res.status(400).send("Empty chat");
   } 
   else {
       res.status(200).send(msg);
       console.log("abcde");  
     }
});

module.exports = api;
