//express
let express = require("express");
let app = express();
var reload = require('reload')
const path = require("path");
const cors = require('cors');
const userroute = require('./server/routes/user.routes');
const transactionroute = require('./server/routes/transaction.routes');
//Static Folder
app.use(express.static(__dirname + '/public/dist'));


let bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

//Morgan
let morgan = require("morgan");
app.use(morgan("dev"));

const port =  '1337';
app.use(cors());
app.set('port', port);

/*
  |--------------------------------------
  | MongoDB
  |--------------------------------------
  */

//const MONGO_URI = 'mongodb://localhost/usersSchema';

const MONGO_URI = 'mongodb://db:password@ds245548.mlab.com:45548/mean-crypto'

const mongoose = require('mongoose');
mongoose.connect(MONGO_URI);
 const monDb = mongoose.connection;
 
 monDb.on('error', function() {
     console.error('MongoDB Connection Error. Please make sure that ', MONGO_URI , 'is running.');
   });
 
 monDb.once('open', function callback() {
     console.info('Connected to MongoDB:', MONGO_URI);
  
 });


app.use('/', userroute);
app.use('/',transactionroute);

app.listen(port, () => console.log(`Server running on localhost:${port}`));