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
    || error instanceof NotFoundError) {
    res.status(error.status).json(error).end()
  } else {
    next(error)
  }
})

// Dedicated handler for InternalServerError
router.use((error, req, res, next) => {
  if (error instanceof InternalServerError) {
    if (env.isProd) {
      res.status(error.status).json({"status": error.status}).end()
    } else {
      res.status(error.status).json(error).end()
    }
  } else {
    next(error)
  }
})

// Handler for not managed errors
router.use((error, req, res, next) => {
  if (env.isProd) {
    res.status(error.status).json({"status": error.status}).end()
  } else {
    res.status(error.status).json(error).end()
  }
})

// All other routes (not defined by the app) => NotFoundError
router.get('*', (req, res, next) => {
  const err = new NotFoundError()
  res.status(err.status).json(err).end()
});

module.exports = router
