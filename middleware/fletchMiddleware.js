const asyncHandler = require('express-async-handler')
const {Playlist} = require("../models/playlist")

const fletch = asyncHandler(async (req, res, next) => { 
  {
    try {
      
      // Get user from the token
      req.playlist = await Playlist.findById(req.params.id)
      

      // check if user exists
      if (req.playlist.private === true){
        res.status(401)
        throw new Error('Not authorized')
      }      
      next()
      
    } catch (error) {
      console.log(error)
      res.status(500)
      throw new Error('Internal Server Error')
    }
  }})
module.exports = { fletch }