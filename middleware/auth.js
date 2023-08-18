const catchAsyncError = require('./catchAsyncError');
const User = require('../models/userModels');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config({path: 'config/config.env'})

const JWt_SECRET = process.env.JWTSECRET

exports.isAuthenticatedUser = catchAsyncError( async (req,res,next) => {
    const token = req.cookies.token
    if (!token) {
        return res.status(401).json({ message: 'Please log in to access this resource' });
    }
    try {
        const decoded = jwt.verify(token, JWt_SECRET);
        console.log("decoded =>",decoded);
        req.user = await User.findById(decoded._id);
        next();
    } catch (error) {
        return res.status(401).json({ message: 'Invalid token' });
    }
})