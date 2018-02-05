const router = require('express').Router({ mergeParams: true })

router.get('/', (req, res) => {
  res.status(200).json({ status: 'UP' }).end()
})

router.use('/users', require('./users/routes'))
/*
router.get('*', (req, res, next) => {
  // All other routes: Set a 404 error
  res.sendStatus(404).end()
});

router.use((error, req, res, next) => {
  res.status(500).json(res)
})*/

module.exports = router
