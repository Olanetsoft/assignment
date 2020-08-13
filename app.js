const express = require('express');
const morgan = require('morgan');
const cors = require('cors');


//Requiring all route
const balanceRoute = require('./routes/balanceRoute');
const eventRoute = require('./routes/eventRoute');


const app = express()

//This line below is required to parse the request body
app.use(express.json());


//Global Middleware registered
//Using morgan only in development
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}

//using cors to set Access-Control-Allow-Origin
app.use(cors());
app.options('*', cors());


//registering the route middleware
app.use(balanceRoute);
app.use(eventRoute);



module.exports = app;
