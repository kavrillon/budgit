const SchemaBuilder = require('../utils/SchemaBuilder')

const definition = {
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  firstname: {
    type: String,
  },
  lastname: {
    type: String,
  }
}

const options = {
  collection: 'users'
}

const builder = new SchemaBuilder(definition, options)
module.exports = builder.getSchema()
