// BUILD YOUR SERVER HERE
const express = require('express');
const User = require('./users/model')
//INSTANCE OF EXPRESS APP
const server = express();



//ENDPOINTS

server.get('/api/users', (req, res) => {
    User.find()
    .then(users => {
        res.json(users)
    })
    .catch(err => {
         res.status(500).json({
            message: "The users information could not be retrieved",
            err:  err.message,
            stack: err.stack,
         })
    })
})

server.get('/api/users/:id', (req, res) => {
    User.findById(req.params.id)
    .then(user => {
        if(!user) {
            res.status(404).json({
                message: "The user with the specified ID does not exist",
            })
        }
        res.json(user)
    })
    .catch(err => {
         res.status(500).json({
            message: "error gettng user",
            err:  err.message,
            stack: err.stack,
         })
    })
})

//Global middleware
// server.use('*', (req, res) =>  {
//        res.status(404).json({
//         message:   'not found'
//        })
// });

server.use((req, res, next) => {
    res.status(404).json({
      message: 'Endpoint not found'
    });
  });
module.exports = server; // EXPORT YOUR SERVER instead of {}
