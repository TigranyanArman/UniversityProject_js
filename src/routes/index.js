const userRouter = require('../routes/user')
const courseRouter = require('../routes/course')
const router = require('express').Router()

router.use('/user', userRouter)
router.use('/course', courseRouter)

router.get('/', (req, res) => {
  console.log('Welcome to the Auction_App')
  res.status(200).json('Server is working')
})

module.exports = router
