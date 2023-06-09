const { Opinion, Profile } = require('../models')

async function castOpinion(req, res) {
  try {
    req.body.opinionId = req.user.profile.id

    const prevOpinion = await Opinion.findOne({
      where: {
        opinionId: req.body.opinionId,
        profileId: req.body.profileId,
      },
    })

    if (prevOpinion) {
      prevOpinion.value = req.body.value
      prevOpinion.comment = req.body.comment
      await prevOpinion.save()
    } else {
      await Opinion.create(req.body)
    }

    const profile = await Profile.findByPk(req.body.profileId, {
      include: { model: Opinion, as: 'opinionsReceived' },
    })

    res.status(200).json(profile)
  } catch (error) {
    console.log(error)
    res.status(500).json({ err: error })
  }
}

module.exports = {
  castOpinion
}


