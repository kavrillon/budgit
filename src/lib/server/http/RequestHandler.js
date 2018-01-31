'use strict'
const Promise = require('bluebird')
const statuses = require('./statuses')

class RequestHandler {
  constructor() {
    this.handler = () => {
      return Promise.resolve()
    }
    this.successStatus = statuses.SUCCESS
  }

  setHandler(fn) {
    this.handler = fn
    return this
  }

  setSuccessStatus(statusCode) {
    this.successStatus = statusCode
    return this
  }

  handle() {
    return (req, res, next) => {
      return this
        .handler(req, res)
        .then((data) => {
          res.status(this.successStatus)
          if (data) {
            res.json(data)
            res.locals.data = data
          } else {
            res.end()
          }
        })
        .catch(next)
    }
  }

  static new() {
    return new RequestHandler()
  }

  static get status() {
    return statuses
  }
}

module.exports = RequestHandler
