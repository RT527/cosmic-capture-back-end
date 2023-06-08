const express = require('express')
const axios = require('axios')
require('dotenv').config()
// const epicsCtrl = require('../controllers/epics');

const router = express.Router()

/*---------- Public Routes ----------*/
// router.post('/', epicsCtrl.createEpic);

/*---------- Protected Routes ----------*/

router.get('/', (req, res) => {
  const imageUrl = `https://api.nasa.gov/EPIC/archive/natural/2019/05/30/png/epic_1b_20190530011359.png?api_key=${process.env.NASA_API_KEY}`;
  res.json({ url: imageUrl });
});

module.exports = router;
