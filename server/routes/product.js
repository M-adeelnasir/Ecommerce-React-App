const express = require('express')
const router = express.Router();

//@midlewares
const { checkAuth, checkAdmin } = require("../midlewares/auth")

const { create, getProducts, deleteProduct } = require('../controllers/product')

router.post('/product', checkAuth, checkAdmin, create)
router.get('/products/:count', getProducts)
router.delete('/product/delete/:slug', checkAuth, checkAdmin, deleteProduct)





module.exports = router