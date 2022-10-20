const jwt = require('jsonwebtoken')
const { JWT_SECRET: secret } = require('../../config')
const User = require('../models/userModel')

async function verify (req, res, next) {
  const bearer = req.headers.authorization
  if (typeof bearer !== 'undefined') {
    const token = bearer.split(' ')[1]
    try {
      const { id } = await jwt.verify(token, secret)
      const user = await User.findById(id)
      req.user = user
      next()
    } catch (error) {
      res.json({
        msg: 'Account is not logged in'
      })
    }
  } else {
    console.log(123)
    res.sendStatus(403)
  }
}

module.exports = verify
