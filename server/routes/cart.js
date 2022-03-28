const express = require('express')
const router = express.Router();

//middleware
const { checkAuth } = require('../midlewares/auth')
//controller

const { userCart } = require('../controllers/cart')

router.post('/user/cart', checkAuth, userCart)

module.exports = router