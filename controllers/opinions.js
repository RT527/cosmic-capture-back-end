// const { Opinion, Profile } = require('../models')

// async function castOpinion(req, res) {
//   try {
//     req.body.opinionId = req.user.profile.id

//     const prevOpinion = await Opinion.findOne({
//       where: {
//         opinionId: req.body.opinionId,
//         profileId: req.body.profileId,
//       },
//     })

//     if (prevOpinion) {
//       prevOpinion.value = req.body.value
//       prevOpinion.comment = req.body.comment
//       await prevOpinion.save()
//     } else {
//       await Opinion.create(req.body)
//     }

//     const profile = await Profile.findByPk(req.body.profileId, {
//       include: { model: Opinion, as: 'opinionsReceived' },
//     })

//     res.status(200).json(profile)
//   } catch (error) {
//     console.log(error)
//     res.status(500).json({ err: error })
//   }
// }

// module.exports = {
//   castOpinion
// }

const { Opinion, Profile } = require('../models')

async function castOpinion(req, res) {
  try {
    const { value, comment, profileId } = req.body
    const opinionId = req.user.profile.id

    const prevOpinion = await Opinion.findOne({
      where: {
        id: req.params.opinionId,
        profileId,
        opinionId,
      },
    })

    if (!prevOpinion) {
      await Opinion.create({
        value,
        comment,
        profileId,
        opinionId,
      })
    } else {
      if (prevOpinion.opinionId !== opinionId) {
        return res
          .status(403)
          .json({ error: "You don't have permission to edit this opinion." })
      }

      prevOpinion.value = value
      prevOpinion.comment = comment
      await prevOpinion.save()
    }

    const profile = await Profile.findByPk(profileId, {
      include: { model: Opinion, as: 'opinionsReceived' },
    })

    res.status(200).json(profile)
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: 'Failed to update the opinion.' })
  }
}

module.exports = {
  castOpinion,
}
