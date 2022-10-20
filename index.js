const express = require('express')
const mongoose = require('mongoose')
const app = express()
const bodyParser = require('body-parser')
const apiErrorHandler = require('./src/error/api-error-handler')

const router = require('./src/routes/index')

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(router)
app.use(apiErrorHandler)
// app.use('/uploads', express.static('./uploads'))

const DB_URL = 'mongodb+srv://Arman:yHqL6sneMeuT2r95@cluster0.qpymkyv.mongodb.net/?retryWrites=true&w=majority'
mongoose.connect(DB_URL, { useUnifiedTopology: true, useNewUrlParser: true })

app.listen(3000, () => {
  console.log('Server is running')
})
