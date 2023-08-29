const express = require('express');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' })
const router = express.Router();
const { 
    createProduct,
    getAllProducts,
    getProductDetails,
    updateProduct,
    deleteProducts,
    filteredProducts
 } = require('../controllers/productController');
// const { isAuthenticatedUser } = require('../middleware/auth')


router.route('/products/new').post( upload.single('images'), createProduct)
router.route('/products').get(getAllProducts)

router.route('/search').get(filteredProducts)

router.route('/products/:id')
.get(getProductDetails)
.put( upload.single('images'), updateProduct)
.delete(deleteProducts)
module.exports = router;