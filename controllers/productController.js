const Product = require('../models/productModel');
const CatchAsyncErrors = require('../middleware/catchAsyncError');
const ApiFeatures = require('../utils/apifeatures');

// create a product --admin
exports.createProduct= CatchAsyncErrors( async (req,res,next)=>{
    const product = await Product.create(req.body);
    console.log("product => ",product);
    res.status(201).json({
        success:true,
        product
    })
})

// Get All Products :
exports.getAllProducts = CatchAsyncErrors(async (req,res,next) => {
    const findAllProduct = await Product.find();
    console.log("f=>", findAllProduct);

    res.status(200).json({
        success: true,
        findAllProduct
    });
})

// Get product details
exports.getProductDetails = CatchAsyncErrors(async (req,res,next) => {
    const product = await Product.findById(req.params.id);
    if(!product) {
        res.status(400).send("Product not found");
    }

    res.status(200).json({sucess: true, product})
})

// Update Products :
exports.updateProduct = CatchAsyncErrors(async(req,res,next) => {
    let product = await Product.findById(req.params.id)
    if(!product) {
        res.status(400).send("Product not found");
    }

    product = await Product.findByIdAndUpdate(
        req.params.id, req.body,{ new:true, runValidators:true, useFindAndModify:true })
    
        res.status(200).json({
            success: true,
            product
        })
})

//Delete Products :
exports.deleteProducts = CatchAsyncErrors(async(req, res, next) => {
    const product = await Product.findByIdAndDelete(req.params.id)
    if(!product){
        res.status(400).send('Product not found')
    }

    res.status(200).json({
        success: true,
        message: 'Product deleted successfully'
    })
})


// Search ,Filter, Pagination :
exports.filteredProducts = CatchAsyncErrors(async(req,res,next) => {
 try {
     const resultPerPage = 5
     let query = Product.find();
 
     query = ApiFeatures.search(query, req.query); //http://localhost:4001/api/v1/search?keyword=wash
     query = ApiFeatures.filter(query, req.query); //http://localhost:4001/api/v1/search?price=30000
     query = ApiFeatures.pagination(query, req.query, resultPerPage); //http://localhost:4001/api/v1/search?page=2&limit=5
 

     const results = await query.exec()
     console.log("Results =>",results);1   
     
     res.status(200).json({
         success: true,
         data: results
     })
 } catch (error) {
    res.status(500).send(error)
 }
})