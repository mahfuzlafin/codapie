// import
const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');

// import router
const userRouter = require('./routes/userRoutes');

// express app
const app = express();

// middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// logging
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}

// route
app.use('/api/v1/users', userRouter);

// export
module.exports = app;
