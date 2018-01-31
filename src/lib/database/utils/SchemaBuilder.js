const mongoose = require('mongoose')
const Schema = mongoose.Schema

class SchemaBuilder {
  constructor(definition, options) {
    const schemaOptions = Object.assign({
      id: false,
      minimize: false,
      strict: true,
      timestamps: {
        createdAt: 'createdAt',
        updatedAt: 'updatedAt'
      },
      versionKey: '_v',
    }, options)

    this.schema = new Schema(definition, schemaOptions)
  }

  getSchema() {
    return this.schema
  }
}

module.exports = SchemaBuilder
