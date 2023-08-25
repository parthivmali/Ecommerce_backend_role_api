const mongoose = require('mongoose');
const validator = require('validator');

const productSchemas = new mongoose.Schema({
    prod_name: {
        type : String,
        required: [true, 'please enter the product name'],
        trim: true
    },
    description: {
        type : String,
        required: [true, 'please enter the description']
    },
    price: {
        type : Number,
        required: [true, 'please enter the product price'],
        maxlength : [8,'price cannot be empty']
    },
    ratings: {
        type: Number,
        default: 0
    },
    images: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: [true,'please enter the product category']
    },
    stock: {
        type: Number,
        required: [true,'please enter the product length'],
        maxlength: [4,'stock length must be 4 char'],
        default:1
    },
    numOfReviews: {
        type: Number,
        default: 0
    },
    createdAt: {
        type: Date,
        default: Date.now()
    }
});

module.exports = mongoose.model('product',productSchemas)