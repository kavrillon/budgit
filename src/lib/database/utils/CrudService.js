const { reduce, isEqual } = require('lodash')
const { toJson } = require('./json')
const { BadRequestError, NotFoundError } = require('../../http/errors')
const statuses = require('../statuses')

class ModelService {
  constructor(model) {
    this.model = model
  }

  find(query) {
    return this.model.find(query)
      .lean()
      .exec()
      .then(toJson)
  }

  findOneById(id) {
    return this.model.findById(id)
      .lean()
      .exec()
      .then((result) => {
        if (result) {
          return toJson((result))
        } else {
          throw new NotFoundError()
        }
      })
  }

  create(data) {
    return new this.model(data)
      .validate() // Validate before create to avoid double hook error handling
      .then(() => {
        return this.model.create(data)
          .then(toJson)
      })
  }

  replace(id, data) {
    const options = { new: true, overwrite: true }

    return new this.model(data)
      .validate()
      .then(() => {
        return this.findOneById(id)
      })
      .then((oldDoc) => {
        data = _mergeInternalFields(oldDoc, data)
        data._updatedAt = new Date().toISOString()

        return this.model.findByIdAndUpdate(id, data, options)
          .then((newDoc) => {
            return {
              'old': toJson(oldDoc),
              'new': toJson(newDoc),
              'diff': _getDiff(oldDoc, newDoc)
            }
          })
      })
  }

  update(id, data) {
    const options = {
      new: true,
      setDefaultsOnInsert: true,
      runValidators: true
    }

    return this.findOneById(id)
      .then((oldDoc) => {
        return this.model.findByIdAndUpdate(id, data, options)
          .then((newDoc) => {
            return {
              'old': toJson(oldDoc),
              'new': toJson(newDoc),
              'diff': _getDiff(oldDoc, newDoc)
            }
          })
      })
  }

  removeById(id) {
    return this.model.findById(id)
      .lean()
      .exec()
      .then((result) => {
        if (result) {
          return new this.model(result).remove()
        } else {
          throw new NotFoundError()
        }
      })
  }
}

module.exports = ModelService

function _mergeInternalFields(object, data) {
  Object.keys(object).forEach((key) => {
    if (object.hasOwnProperty(key) && key[0] === '_') {
      data[key] = object[key];
    }
  })
  return data
}

function _getDiff(oldDoc, newDoc) {
  const o = toJson(oldDoc)
  const n = toJson(newDoc)

  return reduce(o, (result, value, key) => {
    return isEqual(value, n[key]) ?
      result : result.concat(key)
  }, [])
}
