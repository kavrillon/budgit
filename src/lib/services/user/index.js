const db = require('../../database/index')
const CrudService = require('../../database/utils/CrudService')

class UserService extends CrudService {
  constructor(model) {
    super(model)
  }
}

module.exports = new UserService(db.getModel('User'))
