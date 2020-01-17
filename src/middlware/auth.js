const jwt = require('jsonwebtoken');
const User = require('../database/models/user.js');

const auth = async (req, res, next) => {
    try{
        const token = req.header('Authorization').replace('Bearer ', '');
        const data = jwt.verify(token, 'privatekey');
        const user = await User.findOne({ _id: data._id });

        if(!user){
            throw new Error("Error login first");
        }

        req.user = user;
        next();
    } catch(error){
        res.status(500).send("Error: Login first")
    }
}

module.exports = auth;