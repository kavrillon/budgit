const router = require('express').Router({ mergeParams: true })

router.get('/', (req, res) => {
  res.status(200).json({ message: 'Up!' })
})

router.use('/users', require('./users/routes'))

module.exports = router
