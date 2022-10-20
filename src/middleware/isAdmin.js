
async function isAdmin (req, res, next) {
  if (req.user.role !== 'admin') {
    res.json({
      message: 'Only Admin can do that action'
    })
  }
  next()
}

module.exports = isAdmin
