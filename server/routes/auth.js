const express = require('express')
const router = express.Router();

//@midlewares
const { checkAuth, checkAdmin } = require("../midlewares/auth")

const { updateOrCreateUser, currentUser } = require('../controllers/auth')


router.post('/create-or-update-user', checkAuth, updateOrCreateUser)
router.post('/current-user', checkAuth, currentUser)
router.post('/current-admin', checkAuth, checkAdmin, currentUser)


module.exports = router