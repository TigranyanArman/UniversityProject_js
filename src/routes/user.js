
const router = require('express').Router()
const userController = require('../controller/user')
const verify = require('../middleware/verify')
const isAdmin = require('../middleware/isAdmin')
const multer = require('multer')

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/')
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + file.originalname)
  }
})

const fileFilter = (req, file, cb) => {
  if (file.mimetype === 'image/png' || file.mimetype === 'image/jpeg') {
    cb(null, true)
  } else {
    cb(null, false)
  }
}
const upload = multer({
  storage,
  limits: {
    fileSize: 1024 * 1024 * 9
  },
  fileFilter
})

router.post('/registration', upload.single('userImage'), userController.registration)
router.post('/login', userController.loginUser)
router.get('/', verify, userController.GetUsers)
router.get('/:id', verify, userController.GetUser)
router.get('/query/get', verify, userController.userQuery)
router.put('/:id', verify, isAdmin, userController.updateUser)
router.delete('/:id', verify, isAdmin, userController.deleteUser)
router.post('/course/:id', verify, userController.addCourse)
router.delete('/course/:id', verify, userController.deleteCourse)
router.get('/myclasses/:id', verify, userController.getClasses)
router.get('/image/download', verify, userController.uploadImage)
module.exports = router
