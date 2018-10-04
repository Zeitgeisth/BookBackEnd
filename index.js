const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./routes');
const config = require('config');


const app = express();

if(!config.get('jwtPrivateKey')){
    console.error("Fatal Error JWT key not defined");
    process.exit(1);
}

app.use(bodyParser.json({
    limit:'1000mb'
}));

app.use('/uploads',express.static('uploads'));
app.use(bodyParser.urlencoded({extended:true}));
app.use('/API/Shopline',routes);

const port = process.env.PORT || config.get('port');
app.listen(port, ()=>console.log(`Listening on port ${port}`));