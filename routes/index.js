const express = require('express');

// Import our modular routers for /tips and /feedback
const apiRouter = require('./notes');

const app = express();


app.use('/api', apiRouter);

module.exports = app;
