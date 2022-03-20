const express = require('express')
const router = express.Router();

//@midlewares
const { checkAuth, checkAdmin } = require("../midlewares/auth")

const { create, getProducts, deleteProduct, read, updateProduct, list, getProductsCount } = require('../controllers/product')

router.post('/product', checkAuth, checkAdmin, create)
//should be on top before getting the products all
router.get('/products/total', getProductsCount)

router.get('/products/:count', getProducts)
router.delete('/product/delete/:slug', checkAuth, checkAdmin, deleteProduct)
router.get('/product/:slug', read)
router.put('/product/update/:slug', checkAuth, checkAdmin, updateProduct)
router.post('/products', list)



module.exports = router