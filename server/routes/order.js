const express = require('express')
const router = express.Router();


const { checkAuth, checkAdmin } = require('../midlewares/auth')

const { createOrder, getOrders, getAllOrders, orderStatus } = require('../controllers/order')

router.post('/user/order', checkAuth, createOrder)

router.get('/user/orders', checkAuth, getOrders)

//manage orders by admin
router.get('/admin/orders', checkAuth, checkAdmin, getAllOrders)
router.put('/admin/order-status', checkAuth, checkAdmin, orderStatus)

module.exports = router