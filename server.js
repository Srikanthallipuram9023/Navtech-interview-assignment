// import all modules
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var cors = require('cors');
var mongoose = require('mongoose');
mongoose.Promise = require('bluebird');

// Database config import
const mongodbUrl = require("./resApi/database/db");
// database connection
const db = mongoose.connection;

const options = {
    auto_reconnect: true,
    reconnectTries: Number.MAX_VALUE, // Never stop trying to reconnect
    reconnectInterval: 500, // Reconnect every 500ms
    poolSize: 500, // Maintain up to 500 socket connections
    // If not connected, return errors immediately rather than waiting for reconnect
    bufferMaxEntries: 0,
    keepAlive: 120,
    promiseLibrary: require('bluebird'),
    useCreateIndex: true,
    useNewUrlParser: true
}
db.on('open', function(){
    console.log('Mongoose connected successfully');
});
db.once('error', function(err) {
    console.error('mongoose error', err);
    mongoose.disconnect();
});
db.on('reconnected', function() {
    console.log('mongoose reconnected');
});
db.on('disconnected', function() {
    console.log('mongoose disconnected');
    mongoose.connect(mongodbUrl.DATABASEURL, options).then(() => {
        console.log('mongo connected successfully');
    }).catch((err) => {
        console.log('mongoose connected error', err);
    });
});

mongoose.connect(mongodbUrl.DATABASEURL, options).then(() => {
    console.log('mongo connected successfully');
}).catch((err) => {
    console.log('err', err);
});


app.use(bodyParser.json());
app.use(bodyParser.json({}));
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors(), function(req, res, next){
    next();
});

// port 
function normalizePort(val) {
    const port = parseInt(val, 10);
    if(isNaN(port)) {
        // named pipe
        return val;
    }
    if(port >= 0){
        // port number
        return port;
    }
    return false;
}
const port = normalizePort(process.env.PORT || 8080 );

// Cath unauthorised error
app.use(function(err, req, res, next) {
    if(err.name === 'UnauthorizedError'){
        res.status(401);
        res.json({
            message: err.name + "=>" + err.message
        })
    }
});


// routing declare
const userApi = require('./resApi/Routers/userRouter');
// Orders routing
const ordersApi = require("./resApi/Routers/orderRouter");

app.use('/userApi', userApi);
app.use('/ordersApi', ordersApi);


app.listen(port, () => {
    console.log(`Server started on port ${port}`)
});