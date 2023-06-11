const express = require('express')
const axios = require('axios')
require('dotenv').config()

const router = express.Router()

/*---------- Public Routes ----------*/

/*---------- Protected Routes ----------*/

router.get('/', async (req, res) => {
  try {
    const response = await axios.get('https://api.nasa.gov/EPIC/archive/natural/2019/05/30/png/epic_1b_20190530011359.png', {
      params: {
        api_key: process.env.NASA_API_KEY,
      },
      responseType: 'arraybuffer',
    })

    const imageData = Buffer.from(response.data, 'binary').toString('base64')
    const imageUrl = `data:${response.headers['content-type']};base64,${imageData}`

    const caption = "This image was taken by NASA's EPIC camera onboard the NOAA DSCOVR spacecraft"
    const date = "2023-06-09"

    res.json({ url: imageUrl, caption: caption, date: date })
  } catch (error) {
    console.log('Error fetching image data:', error)
    res.status(500).json({ error: 'Failed to fetch image data' })
  }
})

module.exports = router