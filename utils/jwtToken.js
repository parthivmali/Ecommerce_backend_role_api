const sendToken = (user, statusCode, res) => {
    const token = user.getJWTToken()
    const COOKIE_EXPIRE = 5
    const options = {
        expires: new Date(
            Date.now() + COOKIE_EXPIRE * 24 * 60 * 60 * 1000
        ),
        httpOnly : true,
    }

    res.status(statusCode).cookie('token',token,options).json({
        success : true,
        token,
    })
}

module.exports = sendToken