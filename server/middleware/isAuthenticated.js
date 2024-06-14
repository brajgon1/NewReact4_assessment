// loading dotenv 
require('dotenv').config()
// importing jsonwebtoken library for jwt's
const jwt = require('jsonwebtoken')
// destructured SECRET variable from .env file
const {SECRET} = process.env

module.exports = {
   isAuthenticated: (req, res, next) => {
      const headerToken = req.get('Authorization')

      if (!headerToken) {
            console.log('ERROR IN auth middleware')
            res.sendStatus(401)
      }

      let token
    //   verify JWT token using secret key
      try {
            token = jwt.verify(headerToken, SECRET)
      } catch (err) {
        // if error happens, error will be thrown 
            err.statusCode = 500
            throw err
      }

      if (!token) {
            const error = new Error('Not authenticated.')
            error.statusCode = 401
            throw error
      }

      next()
   }
}