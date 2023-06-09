require('dotenv').config()
const express = require('express')
const logger = require('morgan')
const cors = require('cors')
const formData = require('express-form-data')
const fetch = require('isomorphic-fetch')

// Create the express app
const app = express()

// Basic middleware
app.use(cors())
app.use(logger('dev'))
app.use(express.json())
app.use(formData.parse())

// Import routes
const profilesRouter = require('./routes/profiles.js')
const authRouter = require('./routes/auth.js')
const epicsRouter = require('./routes/epics.js')
const opinionsRouter = require('./routes/opinions.js')

// Mount imported routes
app.use('/api/profiles', profilesRouter)
app.use('/api/auth', authRouter)
app.use('/api/epics', epicsRouter)
app.use('/api/opinions', opinionsRouter)
// Handle 404 errors
app.use(function (req, res, next) {
  res.status(404).json({ err: 'Not found' })
})

// Handle all other errors
app.use(function (err, req, res, next) {
  res.status(err.status || 500).json({ err: err.message })
})

app.listen(3000, '0.0.0.0', () => {
  console.log('Server is listening on 0.0.0.0:3000')
})

module.exports = app
