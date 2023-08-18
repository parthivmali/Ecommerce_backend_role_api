const User = require('../models/userModels');
const catchAsyncError = require('../middleware/catchAsyncError');
const sendToken = require('../utils/jwtToken');

//  Register User
exports.registerUser = catchAsyncError(async (req,res,next) => {
    const { name,email,password } = req.body;

    const user = await User.create({
        name,email,password,
        avatar: {
            publuc_id : "This is simple id",
            url: 'profilepicUrl'
        }
    });
    sendToken(user,201,res)
    console.log("send token =>",sendToken);
});

// Login User
exports.loginUser = catchAsyncError(async (req,res,next) => {
    const { email, password } = req.body;

    if(!email || !password) {
        res.status(400).send('please enter email and password');
    }

    const user = await User.findOne({ email});
    if(!user){
        res.status(401).send('Invalid email or password');
    }

    const isPassword = user.comparePassword(password);
    if(!isPassword){
        res.status(401).send('Invalid email or password')
    }

    sendToken(user,200,res)
});

// Logout User
exports.logoutUser = catchAsyncError(async (req,res,next) => {
    res.cookie('token',null, {
        expires: new Date(Date.now()),
        httpOnly: true,
    })

    res.status(200).send({sucess:true, message:"Logged out successfully"})
})