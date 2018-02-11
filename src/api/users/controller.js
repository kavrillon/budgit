const userService = require('../../lib/services/user')
const RequestHandler = require('../../lib/http/RequestHandler')


module.exports.find = RequestHandler.new()
  .setHandler(() => {
    return userService.find()
  })
  .handle()

module.exports.findOneById = RequestHandler.new()
  .setHandler((req) => {
    return userService.findOneById(req.params.id)
  })
  .handle()

module.exports.create = RequestHandler.new()
  .setHandler((req) => {
    return userService.create(req.body)
  })
  .handle()

module.exports.replace = RequestHandler.new()
  .setHandler((req) => {
    return userService.replace(req.params.id, req.body)
  })
  .handle()

module.exports.update = RequestHandler.new()
  .setHandler((req) => {
    return userService.update(req.params.id, req.body)
  })
  .handle()

module.exports.remove = RequestHandler.new()
  .setHandler((req) => {
    return userService.removeById(req.params.id)
  })
  .handle()
