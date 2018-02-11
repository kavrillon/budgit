const statuses = require('../statuses')

class InternalServerError extends Error {
  constructor(error = null) {
    super()
    this.status = statuses.INTERNAL_SERVER_ERROR
    this.error = error
    Error.captureStackTrace(this, this.constructor.name)
  }
}

module.exports = InternalServerError
