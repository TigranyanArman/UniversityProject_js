const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({

  username: {
    type: String,
    required: true,
    unique: true
  },

  password: {
    type: String,
    required: true
  },

  role: {
    type: String,
    enum: ['admin', 'student', 'instructor'],
    required: true
  },

  firstname: {
    type: String,
    required: true
  },

  lastname: {
    type: String,
    required: true
  },

  userImage: {
    type: String
  },

  departament: {
    type: String,
    enum: ['DS', 'CS', 'EC', 'BS'],
    required: true
  }

},
{ collection: 'User', versionKey: false }
)

module.exports = mongoose.model('User', userSchema)
