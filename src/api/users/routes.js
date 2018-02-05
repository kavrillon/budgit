const router = require('express').Router()
const controller = require('./controller')

router.get('/', controller.find)
router.post('/', controller.create)

router.get('/:id', controller.findOneById)
router.put('/:id', controller.replace)
router.patch('/:id', controller.update)
router.delete('/:id', controller.remove)

module.exports = router
