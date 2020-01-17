const express = require('express');
const User = require('../database/models/user.js');

const router = express.Router();

router.get('/users', (req, res) => {
    res.send("This is the User details");
})

module.exports = router;