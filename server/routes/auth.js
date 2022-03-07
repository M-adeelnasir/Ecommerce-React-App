const express = require('express')
const router = express.Router();

//@midlewares
const { checkAuth } = require("../midlewares/auth")

const { updateOrCreateUser } = require('../controllers/auth')


router.post('/create-or-update-user', checkAuth, updateOrCreateUser)
module.exports = router