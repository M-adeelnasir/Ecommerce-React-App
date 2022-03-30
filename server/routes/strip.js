const express = require("express")
const router = express.Router();

const { createStripIntent } = require('../controllers/strip')

const { checkAuth } = require('../midlewares/auth')

router.post('/create-strip-intent', checkAuth, createStripIntent)

module.exports = router