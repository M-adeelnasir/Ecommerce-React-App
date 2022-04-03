const express = require('express')
const router = express.Router();


const { checkAuth } = require('../midlewares/auth')

const { createOrder, getOrders } = require('../controllers/order')

router.post('/user/order', checkAuth, createOrder)

router.get('/user/orders', checkAuth, getOrders)

module.exports = router