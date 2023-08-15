/* eslint-disable no-unused-vars */
require('dotenv').config(); //dotenv is a module that loads environment variables from a .env file into process.env
const express = require('express'); //express is a framework for node.js
const morgan = require('morgan'); // morgan is a middleware that logs the requests
const cors = require('cors'); //cors is a middleware that allows cross origin resource sharing
const bodyParser = require('body-parser'); //body-parser is a middleware that parses the body of the request

const authRoutes = require('./routes/auth'); //importing auth routes
const adminRoutes = require('./routes/admin'); //importing admin routes
const productRoutes = require('./routes/product'); //importing product routes
const app = express(); //creating an express app
const corsOptions = {
  origin: '*', //origin is the url of the server that is allowed to access the resources
  optionsSuccessStatus: 200, //status code to use for successful OPTIONS requests
};
app.use(cors(corsOptions)); //using cors middleware
app.use(bodyParser.json()); //bodyParser.json()s parses the body of the request and only looks at json data
app.use(bodyParser.urlencoded({ extended: true })); //bodyParser.urlencoded() parses the body of the request and looks at url encoded data

if (process.env.NODE_ENV === 'development') {
  //if the environment is development then use morgan
  app.use(morgan('dev')); //morgan is a middleware that logs the requests
}

app.use('/auth', authRoutes); //using auth routes
app.use('/admin', adminRoutes); //using admin routes
app.use('/product', productRoutes); //using product routes

app.use((error, req, res, next) => {
  //error handling middleware
  const status = error.statusCode || 500; //if the error has a status code then use that otherwise use 500
  const { message } = error; //error message
  const { data } = error; //error data
  res.status(status).json({ message: message, data: data }); //sending the response
  next();
});

module.exports = app; //exporting app to be used in server.js
