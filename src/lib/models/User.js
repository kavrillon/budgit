const mongoose = require('mongoose')
const Schema = mongoose.Schema

// Define collection and schema for Items
const User = new Schema(
  {
    firstname: {
      type: String
    },
    lastname: {
      type: String
    },
    email: {
      type: String
    },
    password: {
      type: String
    }
  },{
    collection: 'users'
  }
)

module.exports = mongoose.model('User', User)
