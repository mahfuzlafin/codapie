// import package
const express = require('express');

// import local
const userRouter = express.Router();
const userController = require('../controller/userController');

// route
userRouter
    .route('/')
    .get(userController.getAllUsers)
    .post(userController.createUser);

userRouter
    .route('/:userId')
    .get(userController.getUser)
    .patch(userController.updateUser)
    .delete(userController.deleteUser);

// export
module.exports = userRouter;
