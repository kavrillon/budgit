const mongoose = require('mongoose')
const Schema = mongoose.Schema
const { BadRequestError, InternalServerError } = require('../../http/errors')

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
    this.schema.post('save', handleSaveError)
    this.schema.post('update', handleSaveError)
    this.schema.post('findOneAndUpdate', handleSaveError)
    this.schema.post('insertMany', handleSaveError)
    this.schema.post('replaceOne', handleSaveError)
  }
}

module.exports = SchemaBuilder

function handleSaveError(error, doc, next) {
  console.log('')
  console.log('GOOOOOTCHAAAAA')
  console.log(error.name + ' ' + error.code)
  console.log('')
  switch (error.name) {
    case 'ValidationError':
      throw handleValidationError(error.errors);
    case 'MongoError':
    case 'BulkWriteError':
      throw handleMongoError(error);
    case 'CastError':
      throw handleCastError(error);
    default:
      throw error;
  }
}

function handleValidationError(errors) {
  return new BadRequestError('Validation error', Object.keys(errors).map((e) => {
    return {
      name: e,
      error: errors[e].message
    };
  }));
}

function handleMongoError(error) {
  switch (error.code) {
    case 11000:
    case 11001:
      return new BadRequestError('Duplication error', [{
        name: 'email',
        error: `Value "${error.getOperation().email}" already exists`
      }]);
    default:
      console.log(error)
      return new InternalServerError(error.message);
  }
}

function handleCastError(error) {
  switch (error.kind) {
    case 'ObjectId':
      return new (error);
    case 'string':
      let message = `Cast to string failed for field '${error.path}' with value: `;
      try {
        message += JSON.stringify(error.value);
      } catch (e) {
        message += '<ERROR_WHEN_PARSING_VALUE>';
      }
      return new BadRequestError(error.path, error.value);
    default:
      return new InternalServerError(error.message);
  }
}
