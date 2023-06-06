// const { Epic } = require('../models')

// async function createEpic(req, res) {
//   try {
//     const { url, caption, dateCaptured } = req.body
    
//     const epic = await Epic.create({
//       url,
//       caption,
//       dateCaptured
//     })
    
//     res.status(201).json(epic)
//   } catch (error) {
//     res.status(500).json({ error: 'Failed to create epic' })
//   }
// }

// module.exports = {
//   createEpic
// }
