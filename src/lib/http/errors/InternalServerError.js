const statuses = require('../statuses')

class InternalServerError extends Error {
    constructor(message = 'Internal Server Error', info = null) {
        super(message)
        this.status = statuses.INTERNAL_SERVER_ERROR
        this.name = this.constructor.name
        this.info = info
        Error.captureStackTrace(this, this.constructor.name)
    }
}

module.exports = InternalServerError
