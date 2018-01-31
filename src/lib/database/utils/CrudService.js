const { toJson } = require('./json')

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
      .catch(Promise.reject)
  }

  replace(id, data) {
    const newObject = new this.model(data)
    return newObject.validate()
      .then(() => {
        return this.update(id, data)
      })
      .catch(Promise.reject)
  }

  update(id, data) {
    const options = {
      new: true,
      setDefaultsOnInsert: true,
      runValidators: true
    }

    return this.model.findByIdAndUpdate(id, data, options)
      .then(toJson)
      .catch(Promise.reject)
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
    .catch(Promise.reject)
}

module.exports = ModelService
