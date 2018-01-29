const router = require('express').Router()
const UserController = require('../../lib/controllers/users')

router.get('/', UserController.findAll)

router.post('/', UserController.create)

module.exports = router
