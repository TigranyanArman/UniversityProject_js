const User = require('../models/userModel')
const Course = require('../models/courseModel')

async function update (data) {
  try {
    const updateInfo = data.body
    const id = data.id
    console.log(data.id)
    const updatedCourse = await Course.findByIdAndUpdate(id, updateInfo, { new: true })
    return updatedCourse
  } catch (error) {
    throw new Error('Wrong Query')
  }
}

async function getCourse (coursename) {
  const course = await Course.findOne(coursename)
  if (!course) { throw new Error('No course with such a name') }
  return course
}

async function createCourse (data) {
  console.log(data.user.role)
  if (data.user.role !== 'a2dmin') {
    console.log(222)
    throw new Error()
  }
  const course = await Course.create(data)
  return course
}

async function deleteCourse (coursename, userId) {
  const userValid = await User.findById(userId)
  if (!userValid) { throw new Error('Not Valid User') }
  if (userValid.role !== 'Admin') { throw new Error('Only Admin can create a course') }
  const courseExists = await Course.findOneAndDelete(coursename)
  if (courseExists) { return }
  throw new Error("Course doesn't exist")
}

async function getCourses () {
  try {
    const courses = await Course.find()
    return courses
  } catch (error) {
    throw new Error('Not Found')
  }
}

module.exports = { createCourse, deleteCourse, getCourse, getCourses, update }
