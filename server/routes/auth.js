const express = require('express')
const router = express.Router();

//@midlewares
const { checkAuth } = require("../midlewares/auth")

const { updateOrCreateUser, currentUser, checkAdmin } = require('../controllers/auth')


router.post('/create-or-update-user', checkAuth, updateOrCreateUser)
router.post('/current-user', checkAuth, currentUser)
router.post('/current-admin', checkAuth, currentUser)


module.exports = router