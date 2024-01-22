// BUILD YOUR SERVER HERE
const express = require('express');
const User = require('./users/model')
//INSTANCE OF EXPRESS APP
const server = express();

server.use(express.json());

//ENDPOINTS

server.post('/api/users', (req, res) => {
     const user = req.body;
     if(!user.name || !user.bio) {
        res.status(400).json({
            message: 'Please provide name and bio for the user',
        })
     }else {
         User.insert(user)
         .then(postUser => {
             res.status(201).json(postUser)
         })
         .catch(err => {
            res.status(500).json({
                message: "There was an error while saving the user to the database" ,
                err:  err.message,
                stack: err.stack,
            })
         })
     }
})

server.delete('/api/users/:id', async (req, res) => {
    try {
        const targetedUser = await User.findById(req.params.id)

        if(!targetedUser) {
            res.status(404).json({
                message: 'The user with the specified ID does not exist',   
            })
        } else {
            const deletedUser = await User.remove(targetedUser.id)
            res.status(200).json(deletedUser)
        }
    } catch (err) {
        res.status(500).json({
            message: 'The user could not be removed'
        })
    }
})


server.put('/api/users/:id',  async (req, res) => {
     try {
        const targetUser = await User.findById(req.params.id)
        if(!targetUser) {
            res.status(404).json({
                message: 'The user with the specified ID does not exist',
            })
        }else {
            if(!req.body.name || !req.body.bio) {
                res.status(400).json({
                    message: 'Please provide name and bio for the user',
                })
            }else {
                const updateUser = await User.update(
                    req.params.id,
                    req.body,
                )
                res.status(200).json(updateUser)
            }
        }
     }catch(err) {
          res.status(500).json({
            message: 'The user information could not be modified',ss
          })
     }
})

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
