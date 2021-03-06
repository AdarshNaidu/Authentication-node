const express = require('express');
const User = require('../database/models/user.js');
const auth = require('../middlware/auth.js');
const bodyParser = require('body-parser');
const path = require('path');

const publicDirectoryPath = path.join(__dirname, '../../public');

const router = express.Router();
router.use(express.static(publicDirectoryPath))

var urlencodedParser = bodyParser.urlencoded({ extended: false })

router.get('/users/me', auth, (req, res) => {
    res.send(req.user);
})

router.get('/users', async (req, res) => {
    try{
        const users = await User.find({});
        res.send(users);
    } catch(error){
        res.status(500).send();
    }
})

router.post('/users', urlencodedParser, (req, res) => {
    console.log(req.body)
    const user = new User(req.body);
    
    user.save().then(() => {
        res.render('dashboard', {
            name: req.body.name,
            email: req.body.email,
            username: req.body.username
        })
        // res.status(201).send(user)
    }).catch((error) => {
        res.status(500).send(error);
        console.log(error)
    })
})

router.post('/users/login', async (req, res) => {
    try{
        const user = await User.findByCredentials(req.body);
        const token = user.generateAuthToken();
        res.send({user, token});
    } catch(error){
        res.status(500).send(error)
    }
})

router.patch('/users/me', auth, async (req, res) => {
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

        // const user = await User.findByIdAndUpdate(req.params.id, req.body, {new: true});
        const user = req.user;
        updates.forEach((update) => user[update] = req.body[update]);
        await user.save();

        res.send(user)
    } catch(error){
        res.status(500).send();
    }
})

router.delete('/users/me', auth, async (req, res) => {
    try{
        await req.user.remove();
        res.send(req.user);
    } catch(error) {
        res.status(500).send();
    }
})

module.exports = router;