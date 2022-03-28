const express = require('express')
const router = express.Router();

//middleware
const { checkAuth } = require('../midlewares/auth')
//controller

const { userCart, getCart } = require('../controllers/cart')

router.post('/user/cart', checkAuth, userCart)
router.get('/user/cart', checkAuth, getCart)

module.exports = router