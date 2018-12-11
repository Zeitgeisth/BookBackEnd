   const mongoose = require('mongoose');
   const {Chat} = require('../models/chat');
   const {RegisterUser} = require('../models/register');
   
   var name,nickname;
   var numbersofcon = 0;
   const start =  function(io){
        io.on('connection', function(socket){
             numbersofcon = numbersofcon + 1;
            console.log(`Connected as id ${socket.id}`);

        socket.on('newuser', async(data, callback)=>{
            name = data;
            var emails = name.split(" ");
            console.log(emails[0]);
            
            let roomDb = await Chat.find({"Room.RoomId": name}).count();

            if(roomDb == 0){
                let chatNew = new Chat({
                    Room:{
                       RoomId:name
                    }
                });

                   const user1 = await RegisterUser.findOne({email:emails[0]});
                    user1.wholeChat.push(chatNew);
                   console.log(user1);
                    chatNew.registerId.push(user1._id);
                    chatNew.Name.push(user1.firstName+" "+user1.lastName);
                 let success1 = await user1.save();

                   const user2 = await RegisterUser.findOne({email:emails[1]});
                   user2.wholeChat.push(chatNew);
                   console.log(user2);
                   chatNew.registerId.push(user2._id);
                   chatNew.Name.push(user2.firstName+" "+user2.lastName);
                 let success2 = await user2.save();

                 let success = await chatNew.save();
                 if(success1 && success2 && success) console.log('RoomCreated');

            }
       
        });

        socket.on('name', async(data, callback)=>{
            nickname = data;  
            let chatNew = await Chat.findOne({"Room.RoomId":name});
            chatNew.seen = true;
            await chatNew.save();
           
        });

    

        socket.join(name);


        socket.on('message',async (msg)=>{
            console.log(msg);
            let chatNew = await Chat.findOneAndUpdate({"Room.RoomId": name},{$push:{"Room.MessageDetail":{name: nickname,message:msg}}},);
            socket.broadcast.to(name).emit('message',{message:msg, nick: nickname});
            chatNew.Sender = nickname;
            chatNew.seen = false;
            let success = chatNew.save();
            if(!success){console.log(success);}

        });

        socket.on('disconnect',async()=>{
            let chatNew = await Chat.findOne({"Room.RoomId":name});
            if(numbersofcon == 2){
                chatNew.seen = true;
            }
            numbersofcon = numbersofcon - 1;
            await chatNew.save();
            console.log(`${socket.id} disconnected`);
        });
        });
    }

    module.exports = start;



