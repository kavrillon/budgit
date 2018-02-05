const bodyParser = require('body-parser')
const compression = require('compression')
const cors = require('cors')
const express = require('express')

const apiRoutes = require('./api/routes')
const db = require('./lib/database/index')
const env = require('./config/env')

const api = express()

db.connect().then(
  () => {console.log('Database is connected'); },
  err => { console.log('Can not connect to database: ' + err)}
)

api.use(cors())
api.use(bodyParser.urlencoded({ extended: true }))
api.use(bodyParser.json())
api.use(compression({ threshold: 0 }))

api.use('/', apiRoutes)

api.listen(env.apiPort, '0.0.0.0', () => {
  console.log(`API started at localhost:${env.apiPort}`)
})
