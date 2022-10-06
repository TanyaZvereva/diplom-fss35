const express = require('express')
const router = express.Router() //middleware, collects our routes
const {user_create, user_auth} = require('../controllers/userController')

router.post('/user/add', user_create)
router.post('/user/auth', user_auth)

module.exports = router