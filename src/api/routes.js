const router = require('express').Router({ mergeParams: true })
const { BadRequestError, InternalServerError, NotFoundError } = require('../lib/http/errors')
const env = require('../config/env')

// Routes definition
router.get('/', (req, res) => {
  res.status(200).json({ status: 'UP' }).end()
})

router.use('/users', require('./users/routes'))

// Handler for internal HTTP errors
router.use((error, req, res, next) => {
  if (error instanceof BadRequestError
    || error instanceof InternalServerError
    || error instanceof NotFoundError) {
    res.status(error.status).json(error).end()
  } else {
    next(error)
  }
})

// Handler for not managed errors
router.use((error, req, res, next) => {
  console.log(error)
  if (env.isProd) {
    res.status(500).json({"status": 500}).end()
  }
  else {
    res.status(500).json().end()
  }
})

// All other routes (not defined by the app) => NotFoundError
router.get('*', (req, res, next) => {
  const err = new NotFoundError()
  res.status(err.status).json(err).end()
});

module.exports = router
