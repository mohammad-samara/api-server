'use strict';

require('dotenv').config();
///////////
// run ther server and connect to DB

const mongoose = require('mongoose');
const server = require('./lib/server.js');

// connection details should be .env file
//const MONGOOSE_URL = 'mongodb://localhost:27017/food-db';

const mongooseOptions = {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
};

mongoose.connect(process.env.MONGOOSE_URL, mongooseOptions);

server.start(process.env.PORT);