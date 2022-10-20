const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({

  coursename: {
    type: String,
    required: true
  },
  capacity: {
    type: Number,
    required: true
  },
  registered: {
    type: Number,
    required: true
  },
  instructor: {
    type: String,
    required: true
  }
},
{ collection: 'Course', versionKey: false }
)

module.exports = mongoose.model('Course', userSchema)
