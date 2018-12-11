const mongoose = require('mongoose');
const {RegisterUser} = require('../models/register');

const chatSchema = new mongoose.Schema({
    Room:{
        RoomId:{
            type:String,
            required:true
        },
        MessageDetail:[{
            name:{
                type:String,
            },
            message:{
                type:String,
            },
            created:{
                type:Date,
                default:Date.now
            }
        }],
    },
    registerId:[{type:mongoose.Schema.Types.ObjectId, ref:RegisterUser}],
    Name:[{type:String}],
    User:{
        type:String
    },
    Sender:{
        type:String
    },
    seen:{
        type:Boolean
    }

});

const Chat = mongoose.model('Chat', chatSchema);


module.exports.Chat = Chat;