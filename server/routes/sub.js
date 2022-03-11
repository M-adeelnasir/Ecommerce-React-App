const express = require('express')
const router = express.Router()

//middlewares
const { checkAdmin, checkAuth } = require('../midlewares/auth')
//controllers
const { create, read, remove, list, update } = require('../controllers/sub')



router.get('/sub/:slug', read)
router.get('/subs', list)
router.post('/sub', checkAuth, checkAdmin, create)
router.put('/sub/:slug', checkAuth, checkAdmin, update)
router.delete('/sub/:slug', checkAuth, checkAdmin, remove)

module.exports = router
