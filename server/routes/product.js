const express = require('express')
const router = express.Router();

//@midlewares
const { checkAuth, checkAdmin } = require("../midlewares/auth")

const { create, getProduct } = require('../controllers/product')

router.post('/product', checkAuth, checkAdmin, create)
router.get('/products', getProduct)



module.exports = router