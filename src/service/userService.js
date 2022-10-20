const User = require('../models/userModel')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const JuncTableCU = require('../models/junctionTableCU')
const { JWT_SECRET } = require('../../config')
const fs = require('fs')

async function  queryUser (query) {
  console.log('initial params>>>>',query)
  Object.keys(query).map(elem =>{
    if(!query[elem]){
      delete query[elem]
    }
  })
  try {
    const user = await User.find(query)
    return user
  } catch (error) {
    throw new Error(error)
  }
}

async function myImage (imageName) {
  try {
    console.log()
    if (!fs.existsSync(`./uploads/${imageName}`)) {
      throw new Error('no such image')
    }
  } catch (error) {
    throw new Error(error)
  }
}

async function getCourses (userId) {
  try {
    const myclasses = await JuncTableCU.find({ user: userId }).populate('course')
    return myclasses
  } catch (error) {
    throw new Error(error)
  }
}
async function deleteCourse (courseId) {
  try {
    // if (!user.courses.includes(courseId)) throw new Error(' User does not have the mentioned course')
    // console.log(223)
    // const course = await Course.findById(courseId)
    // console.log(course)
    // if (!course) { throw new Error(' Course does not exist') }
    // console.log(!course)
    // await User.updateOne(
    //   {
    //     _id: user._id
    //   },
    //   {
    //     $pull: { courses: courseId }
    //   }
    // )
    // console.log(123)

    // course.registered -= 1
    // course.save()
    // console.log(courseId + '123123123')
    // console.log(userId + '123123123')
    // const courseDeleted = await JuncTableCU.findByIdAndUpdate(userId, { $pullAll: { JuncTableCU: [{ _id: courseId }] } },
    //   { new: true, useFindAndModify: false }).populate('User')
    // return courseDeleted
    const courseDeleted = await JuncTableCU.deleteOne({ course: courseId })
    return courseDeleted
  } catch (error) {
    throw new Error(error)
  }
}

async function addCourse (courseId, user) {
  try {
    console.log(user)
    console.log(courseId)
    // if (user.courses.includes(courseId)) throw new Error('Course already added')

    // const course = await Course.findById(courseId)

    // if (course.capacity < course.registered) { throw new Error('No available seats') }

    // user.courses.push(course)
    // user.save()
    // course.registered += 1
    // course.save()
    // return user
    // const hasCourse = await JuncTableCU.exists({ user: user._id })
    // console.log(hasCourse)
    // if (hasCourse !== null) {
    //   const courseAdded = await JuncTableCU.updateOne({ user: user._id }, { $push: { course: courseId } })
    //   console.log(2)
    //   return courseAdded
    // } else {
    const courseAdded = await JuncTableCU.create({ user: user._id, course: courseId })
    console.log(1)
    return courseAdded
    // }
  } catch (error) {
    throw new Error(error)
  }
}

async function updateUser (data) {
  try {
    const updateInfo = data.body
    const id = data.id
    const updatedUser = await User.findByIdAndUpdate(id, updateInfo, { new: true })
    console.log(3434)
    return updatedUser
  } catch (error) {
    throw new Error(' Wrong fields to update are provided')
  }
}

async function createUser (data, imageUrl) {
  console.log(data)
  const encryptedPassword = await bcrypt.hash(data.password, 10)
  if (data.role && data.role !== 'admin' && data.role !== 'student' && data.role !== 'instructor') {
    throw new Error('unverified role')
  }
  console.log(123123123)

  console.log(111 + imageUrl)
  const user = await User.create({
    ...data,
    password: encryptedPassword,
    userImage: imageUrl
  })

  return user
}

async function loginUser (username, password) {
  try {
    const user = await User.findOne({ username })
    if (!user) {
      throw new Error('user not found')
    }
    const isPasswordVerified = await bcrypt.compare(password, user.password)
    if (!isPasswordVerified) {
      throw new Error('Invalid Password')
    }
    const token = jwt.sign(
      {
        id: user.id
        // username
      },
      JWT_SECRET,
      {
        expiresIn: '24h'
      }
    )
    console.log(123123)
    return token
  } catch (error) {
    console.log(error)
    return console.log('Invalid Username/Password')
  }
}

async function Userlist (userId) {
  try {
    const allUsers = await User.find(userId)
    return allUsers
  } catch (error) {
    return console.log('Only users of this server can access list of all users')
  }
}

async function getUser (userId) {
  try {
    const user = await User.findById(userId)
    if (!user) { throw new Error('Login to search Users') }
    return user
  } catch (error) {
    throw new Error('User is not found')
  }
}

async function deleteUser (userId, usertodelete) {
  try {
    const user = await User.findById(userId)
    if (!user) { throw new Error('Login to search Users') }
    await User.deleteOne(user)
    return
  } catch (error) {
    console.log('something went wrong')
  }
}
module.exports = {
  createUser,
  loginUser,
  Userlist,
  getUser,
  deleteUser,
  updateUser,
  addCourse,
  deleteCourse,
  getCourses,
  myImage,
  queryUser
}
