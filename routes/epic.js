const express = require('express')
const axios = require('axios')
require('dotenv').config()
// const epicsCtrl = require('../controllers/epics');

const router = express.Router()

/*---------- Public Routes ----------*/
// router.post('/', epicsCtrl.createEpic);

/*---------- Protected Routes ----------*/

router.get('/image', async (req, res) => {
  try {
    const apiKey = process.env.NASA_API_KEY
    const epicUrl = 'https://api.nasa.gov/EPIC/api/natural'

    const response = await axios.get(epicUrl, {
      params: {
        api_key: apiKey,
      },
    })

    const data = response.data
    const mostRecentImage = data[0]
    const imageUrl = `https://epic.gsfc.nasa.gov/archive/natural/${mostRecentImage.date.slice(0, 10).replace(/-/g, '/')}/png/${mostRecentImage.image}.png`

    const epicData = {
      url: imageUrl,
      caption: mostRecentImage.caption,
    }

    res.json(epicData)
  } catch (error) {
    console.log('Error fetching EPIC image:', error)
    res.status(500).json({ error: 'An error occurred while fetching EPIC image' })
  }
})

module.exports = router
