const { Opinion } = require('../models')

async function castOpinion(req, res) {
  try {
		req.body.opinionId = req.user.profile.id
    const opinion = await Opinion.create(req.body)
    res.status(200).json(opinion)
  } catch (error) {
    res.status(500).json({ err: error })
  }
}

module.exports = {
  castOpinion
}