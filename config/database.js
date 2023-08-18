const mongoose = require('mongoose');

const connectDataBase = () => {
    mongoose.connect('mongodb://127.0.0.1:27017/Ecommerce-Backend-api',{
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(()=>{
        console.log(`MongoDb is connect with server ${mongoose.connection.host}`);
    })
}

module.exports = connectDataBase;