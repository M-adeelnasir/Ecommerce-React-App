const express = require('express')
const router = express.Router();

//@midlewares
const { checkAuth, checkAdmin } = require("../midlewares/auth")
const { upload, remove } = require('../controllers/cloudinary')

router.post('/uploadimages', checkAuth, checkAdmin, upload)
router.post('/removeimages', checkAuth, checkAdmin, remove)


module.exports = router