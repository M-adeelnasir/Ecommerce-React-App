const express = require('express')
const router = express.Router();

//middlewares
const { checkAdmin, checkAuth } = require('../midlewares/auth')
//controllers
const { create, remove, list } = require('../controllers/coupon')

router.post('/coupon', checkAuth, checkAdmin, create);
router.delete('/coupon/:couponId', checkAuth, checkAdmin, remove);
router.get('/coupons', list)


module.exports = router;
