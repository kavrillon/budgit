const { toJson } = require('./json')
const { BadRequestError, InternalServerError } = require('../../http/errors')

class ModelService {
  constructor(model) {
    this.model = model
  }

  find(query) {
    const q = this.model.find(query)
    return execQuery(q)
  }

  findOneById(id) {
    const q = this.model.findById(id)
    return execQuery(q)
  }

  create(data) {
    return this.model.create(data)
      .then(toJson)
  }

  replace(id, data) {
    const newObject = new this.model(data)
    return newObject.validate()
      .then(() => {
        return this.model.replaceOne({'_id': id}, data)
          .then((res) => {
            if (res.n === 0) {
              throw new BadRequestError('Not Found', [{
                name: 'ID',
                error: `Resource ${id} does not exists`
              }])
            }
            return this.findOneById(id)
          })
      })
  }

  update(id, data) {
    const options = {
      new: true,
      setDefaultsOnInsert: true,
      runValidators: true
    }

    return this.model.findByIdAndUpdate(id, data, options)
      .then(toJson)
  }

  removeById(id) {
    return this.model.findByIdAndRemove(id)
      .then(toJson)
  }
}

function execQuery(q) {
  return q
    .lean()
    .exec()
    .then(toJson)
}

module.exports = ModelService
