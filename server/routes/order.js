const express = require('express')
const router = express.Router();


const { checkAuth } = require('../midlewares/auth')

const { createOrder } = require('../controllers/order')

router.post('/user/order', checkAuth, createOrder)


module.exports = router