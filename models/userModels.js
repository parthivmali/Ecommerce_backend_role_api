const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config({path: 'config/config.env'})

const JWt_SECRET= process.env.JWTSECRET
const JWt_EXPIRE = '5d'

const userSchemas = new mongoose.Schema({
    name: {
        type: String,
        require: [true, 'please enter your name'],
        maxlength: [30,'name cannot exceed 30 characters'],
        minlength: [4,'name should have more than 4 characters'],
    },
    email: {
        type: String,
        require: [true, 'please enter your email'],
        unique: true,
        validate: [validator.isEmail, 'please enter valid email']
    },
    password: {
        type: String,
        require: [true, 'please enter your password'],
        minlength: [8,'password should be at least 8 characters'],
    },
    avatar: {
        public_id:{
            type: String,
            require: true
        },
        url: {
            type: String,
            require: true
        }
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user'
    },
})

userSchemas.pre('save', async function(next) {
    if(!this.isModified("password")){
        next();
    }
    this.password = await bcrypt.hash(this.password,10)
})

//JWT TOKEN :

userSchemas.methods.getJWTToken = function () {
    return jwt.sign({id:this.id},JWt_SECRET,{
        expiresIn:JWt_EXPIRE,
    })
}

userSchemas.methods.comparePassword = async function (enterdPassword){
    return await bcrypt.compare(enterdPassword, this.password);
}

module.exports = mongoose.model('User',userSchemas)