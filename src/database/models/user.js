const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

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

userSchema.methods.generateAuthToken = function() {
    const user = this;
    const token = jwt.sign({_id: user._id.toString() }, 'privatekey');

    return token;
}

userSchema.pre('save', async function(next){
    const user = this;

    if(user.isModified('password')){
        user.password = await bcrypt.hash(user.password, 8);
    }
    next();
})

userSchema.statics.findByCredentials = async (credentials) => {
    try{
        const user = await User.findOne({ username: credentials.username });
        if(!user){
            throw new Error("Error: The username is incorrect")
        }

        const isMatch = await bcrypt.compare(credentials.password, user.password)
        if(!isMatch){
            throw new Error("Error: Password is incorrect")
        }
        return user;
    } catch(error){
        return error;
    }
    
}

const User = mongoose.model('User', userSchema);

module.exports = User;