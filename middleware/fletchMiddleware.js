
const asyncHandler = require('express-async-handler')
const {User} = require('../models/user')

const fletch = asyncHandler(async (req, res, next) => { 
  {
    
    try {
      
      // Get user from the token
      req.user = await User.findById(req.params.id)

      // check if user exists
      if (req.user.private === true){
        res.status(401)
        throw new Error('Not authorized')
      }      
      next()
      
    } catch (error) {
      console.log(error)
      res.status(401)
      throw new Error('Not authorized')
    }
  }

  
})

module.exports = { fletch }
