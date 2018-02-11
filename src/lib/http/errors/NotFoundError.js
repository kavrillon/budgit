const statuses = require('../statuses')

class NotFoundError extends Error {
  constructor() {
    super()
    this.status = statuses.NOT_FOUND
  }
}

module.exports = NotFoundError
