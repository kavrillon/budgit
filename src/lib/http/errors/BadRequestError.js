const statuses = require('../statuses')

class BadRequestError extends Error {
  constructor(message = 'Bad Request', fields = []) {
    super(message)
    this.status = statuses.BAD_REQUEST
    this.name = this.constructor.name
    this.fields = fields
    Error.captureStackTrace(this, this.constructor.name)
  }
}

module.exports = BadRequestError
