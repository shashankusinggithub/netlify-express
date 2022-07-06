const jwt = require('jsonwebtoken')
const asyncHandler = require('express-async-handler')
const { User } = require('../models/user')

const protect = asyncHandler(async (req, res, next) => {

  let token

  if (
    req.headers.authorization
  ) {

    try {
      // Get token from header      
      token = req.headers.authorization

      // Verify token
      const decoded = jwt.verify(token, process.env.JWTPRIVATEKEY)

      // Get user from the token
      req.user = await User.findById(decoded._id)
      
      next()

    } catch (error) {
      console.log(error)
      res.status(500)
      throw new Error('Internal Server Error')
    }
  }

  if (!token) {
    res.status(401)
    throw new Error('Not authorized, no token')
  }
})

module.exports = { protect }
