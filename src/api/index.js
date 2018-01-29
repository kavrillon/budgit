const router = require('express').Router()

router.get('/', (req, res) => {
  res.status(200).json({ message: 'Up!' })
})

router.use('/users', require('./users'))

module.exports = router
