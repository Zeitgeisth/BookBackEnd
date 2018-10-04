const mongoose = require('mongoose');
const config = require('config')


const connectDb = (req, res, next)=>{
   mongoose.connect(config.get('mongoUrl'))
      .then((res)=>console.log('Connected to Database'))
      .catch((err)=>console.log(err))
      next();
  
}


module.exports = connectDb;