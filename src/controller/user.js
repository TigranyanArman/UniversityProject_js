const { createUser, myImage, loginUser: loginUserService, queryUser, Userlist, getUser, deleteUser: _delete, updateUser: update, addCourse: add, deleteCourse: deleteTheCourse, getCourses } = require('../service/userService')
const ApiError = require('../error/ApiError')
const path = require('path')

const userQuery = async (req, res, next) => {
  try {
    const query = req.query
    const queryResult = await queryUser(query)
    res.json({
      status: 'Succes',
      result: res.queryResult
    })
  } catch (error) {
    res.json({
      error,
      message: error.message
    })
  }
}

const uploadImage = async (req, res, next) => {
  try {
    const imageName = req.query.imageName
    await myImage(imageName)
    return res.sendFile(path.resolve(__dirname, '../../uploads', imageName))
  } catch (error) {
    res.json({
      error,
      message: error.message
    })
  }
}

// const ObjectID = require('mongodb')
const getClasses = async (req, res, next) => {
  const { _id: userId } = req.user
  const myCourses = await getCourses(userId)
  res.json({
    myCourses,
    status: 'Success',
    message: 'This is the list of your enrolled courses'
  })
}

async function deleteCourse (req, res, next) {
  try {
    const courseId = req.params.id
    // if (!ObjectID.isValid(courseId)) throw new Error(' Invalid Id')
    console.log(111)
    const courseDeleted = await deleteTheCourse(courseId)
    console.log(222)
    res.json({
      courseDeleted,
      status: 'Success',
      message: 'User has successfully unrolled from this course'
    })
  } catch (error) {
    res.json({
      error,
      message: error.message
    })
  }
}

async function addCourse (req, res, next) {
  try {
    const user = req.user
    const { _id: myuserId } = user
    console.log(myuserId)
    const courseId = req.params.id
    // if (!ObjectID.isValid(courseId)) throw new Error('Invalid ID')
    const courseAdded = await add(courseId, user)
    res.status(200)
    res.json({
      courseAdded,
      status: 'Succes',
      message: 'User has successfully registered for this course'
    })
  } catch (error) {
    res.json({
      error,
      message: error.message
    })
  }
}

async function updateUser (req, res, next) {
  try {
    const data = {
      body: req.body,
      id: req.params.id
    }
    const updatedUser = await update(data)
    res.status(900)
    res.json({
      status: 'Succes',
      result: updatedUser
    })
  } catch (error) {
    res.send(error)
  }
}

async function registration (req, res, next) {
  try {
    console.log(req.file)
    const data = req.body
    const imageUrl = req.file.path
    console.log(imageUrl)
    console.log(data.password)
    if (data.password === '') {
      next(ApiError.BadRequest('You forgot to fill the password field'))
      return
    }
    await createUser(data, imageUrl)
    console.log('user is created')
    res.status(200).send({ success: true, message: 'User is created' })
  } catch (error) {
    res.status(404).send({ success: false, error: { message: 'Skipped fields' } })
  }
}

const loginUser = async (req, res, next) => {
  try {
    const { username, password } = req.body
    const token = await loginUserService(username, password)
    return res.json({ token })
  } catch (error) {
    console.error(error)
  }
}
const GetUsers = async (req, res) => {
  try {
    const users = await Userlist()
    res.send(users)
  } catch (error) {
    console.error(error)
  }
}

const GetUser = async (req, res, next) => {
  try {
    console.log(req.params.id)
    const userId = req.params.id
    const user = await getUser(userId)
    res.send(user).status(200)
  } catch (error) {
    res.status(404).json({
      message: error.message
    })
  }
}

const deleteUser = async (req, res, next) => {
  try {
    const userId = req.params._id
    await _delete(userId)
    res.send('User is successfuly deleted').status(200)
  } catch (error) {
    console.error(error)
  }
}

// router.post('/registration', registration)

// router.post('/login', loginUser)

// router.get('/getusers/:id', GetUsers)

// router.get('/getuser/:id', GetUser)

// router.put('/updateUser', (req, res) => {

// })

// router.delete('/deleteUser', deleteUser)

const controller =
  {
    registration,
    loginUser,
    GetUser,
    GetUsers,
    deleteUser,
    updateUser,
    addCourse,
    deleteCourse,
    getClasses,
    uploadImage,
    userQuery
  }

module.exports = controller
