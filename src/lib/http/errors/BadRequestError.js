const statuses = require('../statuses')

class BadRequestError extends Error {
  constructor(name, fields = []) {
    super(name)
    this.status = statuses.BAD_REQUEST
    this.name = name || this.constructor.name
    this.fields = fields
    Error.captureStackTrace(this, this.constructor.name)
  }
}

module.exports = BadRequestError
