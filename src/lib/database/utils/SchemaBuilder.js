const mongoose = require('mongoose')
const Schema = mongoose.Schema
const { BadRequestError, InternalServerError } = require('../../http/errors')
const statuses  = require('../statuses')

class SchemaBuilder {
  constructor(definition, options) {
    const schemaOptions = Object.assign({
      id: false,
      minimize: false,
      strict: true,
      timestamps: {
        createdAt: '_createdAt',
        updatedAt: '_updatedAt'
      },
      versionKey: '_v',
    }, options)

    this.schema = new Schema(definition, schemaOptions)
    this.applyHooks()
  }

  getSchema() {
    return this.schema
  }

  applyHooks() {
    this.schema.post('find', handleErrors)
    this.schema.post('findOne', handleErrors)
    this.schema.post('findById', handleErrors)
    this.schema.post('save', handleErrors)
    this.schema.post('update', handleErrors)
    this.schema.post('findOneAndUpdate', handleErrors)
    this.schema.post('insertMany', handleErrors)
    this.schema.post('replaceOne', handleErrors)
    this.schema.post('validate', handleErrors)
    this.schema.post('remove', handleErrors)
  }
}

module.exports = SchemaBuilder

function handleErrors(error, doc, next) {
  switch (error.name) {
    case 'ValidationError':
      throw handleValidationError(error);
    case 'MongoError':
    case 'BulkWriteError':
      throw handleMongoError(error);
    case 'CastError':
      throw handleCastError(error);
    default:
      throw error;
  }
}

function handleValidationError(error) {
  let fields = [];
  if (error.errors) {
    fields = Object.keys(error.errors).map((e) => {
      return {
        name: e,
        error: error.errors[e].message
      };
    })
  }
  return new BadRequestError(statuses.VALIDATION_ERROR, fields);
}

function handleMongoError(error) {
  switch (error.code) {
    case 11000:
    case 11001:
      return new BadRequestError(statuses.DUPLICATE_ERROR, [{
        name: 'email',
        error: `Value already exists`
      }]);
    case 66:
      return new BadRequestError(statuses.IMMUTABLE_ERROR, [{
        name: '_id',
        error: error.message
      }])
    default:
      return new InternalServerError(error);
  }
}

function handleCastError(error) {
  switch (error.kind) {
    case 'ObjectId':
      return new BadRequestError(statuses.VALIDATION_ERROR, {
        name: error.path,
        error: `Cast to _id failed for value ${error.value}`
      });
    case 'string':
      return new BadRequestError(statuses.VALIDATION_ERROR, {
        name: error.name,
        error: `Cast to String failed for field '${error.path}'`
      });
    default:
      return new InternalServerError(error);
  }
}
