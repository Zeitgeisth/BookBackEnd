const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./routes');
const config = require('config');
const server = require('http').createServer(express);
const io = require('socket.io')(server);

const chat = require('./controller/chat');
chat(io);


if(!config.get('jwtPrivateKey')){
    console.error("Fatal Error JWT key not defined");
    process.exit(1);
}

const app = express();

app.use(bodyParser.json({
    limit:'1000mb'
}));

app.use('/uploads',express.static('uploads'));
app.use(bodyParser.urlencoded({extended:true}));
app.use('/API/Shopline',routes);


const port = process.env.PORT || config.get('port');
app.listen(port, ()=>console.log(`Listening on port ${port}`));

server.listen(3000);

