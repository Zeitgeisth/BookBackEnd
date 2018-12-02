// const express = require('express');
// const server = require('http').Server(express);
// const io = require('socket.io')(server);
// const {Router} = require('express');
// const api = Router();

// io.on('connection', (socket)=>{
//     console.log('connected to  '+ socket.id);
// });

// server.listen(3000, function(){
//     console.log((`Listening on port 3000`));
// });
  var name;
   const start =  function(io){
        io.on('connection', function(socket){
            console.log(`Connected as id ${socket.id}`);

        socket.on('newuser',(data, callback)=>{
            name = data;
            console.log(name);
        });

        socket.on('name', (data, callback)=>{
            nickname = data;
        });

        socket.join(name);

        socket.on('message',(msg)=>{
          //  console.log(msg);
            socket.broadcast.to(name).emit('message',{message:msg, nick: nickname});
        });

        socket.on('disconnect',()=>console.log(`${socket.id} disconnected`));
        });
    }

    module.exports = start;



