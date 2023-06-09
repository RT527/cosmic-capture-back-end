const express = require('express')
const axios = require('axios')
require('dotenv').config()
// const epicsCtrl = require('../controllers/epics')

const router = express.Router()

/*---------- Public Routes ----------*/
// router.post('/', epicsCtrl.createEpic)

/*---------- Protected Routes ----------*/

router.get('/', async (req, res) => {
  try {
    const imageUrl = `https://api.nasa.gov/EPIC/archive/natural/2019/05/30/png/epic_1b_20190530011359.png?api_key=${process.env.NASA_API_KEY}`
    const caption = "This image was taken by NASA's EPIC camera onboard the NOAA DSCOVR spacecraft" 
    const date = "2023-06-09" 
    res.json({ url: imageUrl, caption: caption, date: date })
  } catch (error) {
    console.log('Error fetching image data:', error)
    res.status(500).json({ error: 'Failed to fetch image data' })
  }
})

module.exports = router



