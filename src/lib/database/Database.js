const mongoose = require('mongoose')
const Promise = require('bluebird')
const fs = require('fs')
const rootDir = require('path').normalize(`${__dirname}`)
const extensionLength = -3

class Database {
  constructor(config) {
    this.config = Object.assign({
      url: '',
      database: '',
      user: '',
      pass: '',
      connectErrorTimeout: 1000,
      schemas: `${rootDir}/schemas/`,
    }, config)

    this.loadSchemas()
  }

  connect() {
    mongoose.Promise = global.Promise
    return mongoose.connect(this.buildUrl())
  }

  buildUrl() {
    let auth = ''
    if ('' !== this.config.user && '' !== this.config.password) {
      auth = `${this.config.user}:${this.config.password}@`
    }
    return `mongodb://${auth}${this.config.url}/${this.config.database}`
  }

  loadSchemas() {
    // Load models from schemas project folder
    if (this.config.schemas) {
      fs.readdirSync(this.config.schemas).forEach((fileName) => {
        schemaLoader(this.config.schemas, fileName)
      })
    }
  }

  getModel() {
    return mongoose.model.apply(mongoose, Array.prototype.slice.call(arguments))
  }
}

function schemaLoader(path, fileName) {
  const stats = fs.statSync(`${path}/${fileName}`)
  if (stats.isFile()) {
    const modelName = fileName.slice(0, extensionLength)
    const model = mongoose.model(modelName, require(`${path}/${modelName}`))

    // Promisy the collection to make the raw mongodb functions return promises
    Promise.promisifyAll(model.collection)
  }
}

module.exports = Database
