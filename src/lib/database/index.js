const Database = require('./Database')
const config = require('../../config/database')

const db = new Database(config)

module.exports = db
