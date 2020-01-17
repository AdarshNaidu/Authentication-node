const express = require('express');
const User = require('../database/models/user.js');

const router = express.Router();

router.get('/users', (req, res) => {
    User.find({  }).then((users) => {
        res.send(users)
    }).catch((error) => {
        res.send(error);
    })
})

router.post('/users', (req, res) => {
    const user = new User(req.body);
    
    user.save().then(() => {
        res.status(201).send(user)
    }).catch((error) => {
        res.status(500).send(error);
        console.log(error)
    })
})

router.post('/users/login', async (req, res) => {
    try{
        const user = await User.findByCredentials(req.body);
        res.send(user);

    } catch(error){
        res.status(500).send(error)
    }
})

router.patch('/users/:id',async (req, res) => {
    try{
        const allowedUpdates = ['name', 'username', 'email', 'password']
        const updates = Object.keys(req.body);

        const isValid = updates.every((update) => {
            if(!allowedUpdates.includes(update)){
                return false
            }
            return true;
        })

        if(!isValid){
            throw new Error("Error: Some updates not allowed")
        }

        const user = await User.findByIdAndUpdate(req.params.id, req.body, {new: true});
        res.send(user)
    } catch(error){
        res.status(500).send();
    }
})

router.delete('/users/:id', async (req, res) => {
    try{
        await User.deleteOne({ _id: req.params.id });
        res.send();
    } catch(error) {
        res.status(500).send();
    }
})

module.exports = router;