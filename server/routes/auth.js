const express = require('express')
const router = express.Router();

//@midlewares
const { checkAuth, checkAdmin } = require("../midlewares/auth")

const { updateOrCreateUser, currentUser, removeFromWislist, addToWishlist, getWishlist } = require('../controllers/auth')


router.post('/create-or-update-user', checkAuth, updateOrCreateUser)
router.post('/current-user', checkAuth, currentUser)
router.post('/current-admin', checkAuth, checkAdmin, currentUser)



//Whistlist Routes
router.post('/user/wishlist', checkAuth, addToWishlist)
router.get('/user/wishlist', checkAuth, getWishlist)
router.put('/user/wishlist/:productId', checkAuth, removeFromWislist)


module.exports = router