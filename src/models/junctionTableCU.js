const mongoose = require('mongoose')

const User = require('../models/userModel')
const Course = require('../models/courseModel')

const cuSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: User
  },
  course: {
    type: mongoose.Schema.Types.ObjectId,
    ref: Course
  }
})

module.exports = mongoose.model('JuncTableCU', cuSchema)
