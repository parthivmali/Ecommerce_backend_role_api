const User = require('../models/userModels');
const catchAsyncError = require('../middleware/catchAsyncError');
const sendToken = require('../utils/jwtToken');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config({ path: 'config/config.env' });

const JWt_SECRET = process.env.JWTSECRET;

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

exports.loginUser = catchAsyncError(async (req, res, next) => {
    const { email, password } = req.body;
  
    if (!email || !password) {
      return res.status(400).json({ message: 'Please provide email and password' });
    }
  
    // Check if the provided credentials match the admin credentials
    if (email === 'admin@gmail.com' && password === 'Admin@123') {
      const adminUser = {
        email,
        role: 'admin',
      };
  
      const token = jwt.sign(adminUser, JWt_SECRET, {
        expiresIn: '1h',
      });
  
      return res.status(200).json({ success: true, role: 'admin', token });
    } else {
        const user = await User.findOne({ email});
        if(!user){
            res.status(401).send('Invalid email or password');
        }
    
        const isPasswordCorrect = await user.comparePassword(password);
    
        if (!isPasswordCorrect) {
            return res.status(401).send('Invalid email or password');
        }
        
        const genralUser = {
          email,
          role: 'user',
        };

        const token = jwt.sign(genralUser, JWt_SECRET, {
          expiresIn: '1h',
        });
    
        return res.status(200).json({ success: true, role: 'user', token });
        // sendToken(user,200,res)
    }
  });

// Login User
// exports.loginUser = catchAsyncError(async (req,res,next) => {
//     const { email, password } = req.body;

//     if(!email || !password) {
//         res.status(400).send('please enter email and password');
//     }

//     const user = await User.findOne({ email});
//     if(!user){
//         res.status(401).send('Invalid email or password');
//     }

//     const isPasswordCorrect = await user.comparePassword(password);

//     if (!isPasswordCorrect) {
//         return res.status(401).send('Invalid email or password');
//     }

//     if(user.role === 'admin') {
//         const adminUser = {
//             email,
//             role: 'admin'
//         }

//         const token = jwt.sign(adminUser, JWt_SECRET,{
//             expiresIn: '1h'
//         })

//         return res.status(200).json({sucess:true,role:'admin',token})
//     }

//     sendToken(user,200,res)
// });


// Logout User
exports.logoutUser = catchAsyncError(async (req,res,next) => {
    res.cookie('token',null, {
        expires: new Date(Date.now()),
        httpOnly: true,
    })

    res.status(200).send({sucess:true, message:"Logged out successfully"})
})