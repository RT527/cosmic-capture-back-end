const express = require('express')
const axios = require('axios')
require('dotenv').config()

const router = express.Router()

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
    const randomIndex = Math.floor(Math.random() * data.length)
    const randomImage = data[randomIndex]

    const epicData = {
      url: `https://api.nasa.gov/EPIC/archive/natural/${randomImage.image}.jpg`,
      caption: randomImage.caption,
    }

    res.json(epicData)
  } catch (error) {
    console.log('Error fetching EPIC image:', error)
    res.status(500).json({ error: 'An error occurred while fetching EPIC image' })
  }
})

module.exports = router
