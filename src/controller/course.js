const CourseService = require('../service/courseService')

const controller = {
  addCourse,
  deleteCourse,
  getCourses,
  getCourse,
  updateCourse
}
async function updateCourse (req, res, next) {
  try {
    const data = {
      body: req.body,
      id: req.params.id
    }

    const updatedCourse = await CourseService.update(data)
    res.status(900)
    res.json({
      status: 'Succes',
      result: updatedCourse
    })
  } catch (error) {

  }
}

async function getCourse (req, res, next) {
  try {
    const courseId = req.body.id
    const course = await CourseService.getCourse(courseId)
    res.send(course)
  } catch (error) {
    res.send(error)
  }
}

async function addCourse (req, res, next) {
  try {
    const data = req.body
    data.user = req.user
    console.log(data)
    const course = await CourseService.createCourse(data)
    console.log('yexo')
    res.status(200).send(course)
  } catch (error) {
    console.log(error)
    res.status(404).send({ success: false, error: error.message })
  }
}

async function deleteCourse (req, res, next) {
  try {
    const { coursename } = req.body
    const userId = req.params.id
    await CourseService.deleteCourse(coursename, userId)
  } catch (error) {
    res.status(404).send({ success: false, error: { message: 'Error' } })
  }
}

async function getCourses (req, res, next) {
  try {
    const courses = await CourseService.getCourses()
    res.send(courses)
  } catch (error) {
    res.status(404).send({ success: false, error: { message: 'Error' } })
  }
}

module.exports = controller
