const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    username: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        validate(value){
            if(value.includes(" ")){
                throw new Error("Error: Username cannot contain a space");
            }
        }
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        validate(email){
            if(!validator.isEmail(email)){
                throw new Error("Error: This is not a valid email");
            }
        }
    },
    password: {
        type: String,
        required: true,
    }
})

const User = mongoose.model('User', userSchema);

module.exports = User;