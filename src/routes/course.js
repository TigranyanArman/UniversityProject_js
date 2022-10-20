const { Router } = require('express')
const router = Router()
const verify = require('../middleware/verify')
const isAdmin = require('../middleware/isAdmin')

const courseController = require('../controller/course')

router.post('/addCourse', verify, courseController.addCourse)
router.post('/deletCourse/:id', verify, isAdmin, courseController.deleteCourse)
router.get('/getCourses', verify, courseController.getCourses)
router.get('/getCourse/:id', verify, courseController.getCourse)
router.put('/:id', verify, isAdmin, courseController.updateCourse)

// router.put('/updateCourse', updateCourse)

// router.delete('/registerforCourse', registerforCourse)

module.exports = router
