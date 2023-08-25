const express = require('express');
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


router.route('/products/new').post(createProduct)
router.route('/products').get(getAllProducts)

router.route('/search').get(filteredProducts)

router.route('/products/:id')
.get(getProductDetails)
.put(updateProduct)
.delete(deleteProducts)
module.exports = router;