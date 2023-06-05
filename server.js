require('dotenv').config()
const express = require('express')
const logger = require('morgan')
const cors = require('cors')
const formData = require('express-form-data')
const path = require('path')
const fetch = require('isomorphic-fetch')

// Import routes
const profilesRouter = require('./routes/profiles.js')
const authRouter = require('./routes/auth.js')
const epicRouter = require('./routes/epic')

// Create the express app
const app = express()

// Basic middleware
app.use(cors())
app.use(logger('dev'))
app.use(express.json())
app.use(formData.parse())

// Mount imported routes
app.use('/api/profiles', profilesRouter)
app.use('/api/auth', authRouter)
app.use('/api/epic', epicRouter)

// Add the EPIC image route
app.get('/api/epic/image', async (req, res) => {
  try {
    const apiKey = process.env.NASA_API_KEY
    const response = await fetch(
      `https://api.nasa.gov/EPIC/archive/natural/2019/05/30/png/epic_1b_20190530011359.png?api_key=${apiKey}`
    )
    if (!response.ok) {
      throw new Error('Failed to fetch EPIC image')
    }
    const imageURL = response.url
    const caption = 'Example caption'

    res.json({ url: imageURL, caption: caption })
  } catch (error) {
    console.log('Error fetching EPIC image:', error)
    res.status(500).json({ error: 'Failed to fetch EPIC image' })
  }
})


// Handle 404 errors
app.use(function (req, res, next) {
  res.status(404).json({ err: 'Not found' })
})

// Handle all other errors
app.use(function (err, req, res, next) {
  res.status(err.status || 500).json({ err: err.message })
})

module.exports = app
