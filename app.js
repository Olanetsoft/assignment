const express = require('express');
const morgan = require('morgan');


// Requiring all route
const balanceRoute = require('./routes/balanceRoute');
const eventRoute = require('./routes/eventRoute');


const app = express();

// This line below is required to parse the request body
app.use(express.json());


// Global Middleware registered
// Using morgan only in development
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
};


// Registering the route middleware
app.use(balanceRoute);
app.use(eventRoute);



module.exports = app;
