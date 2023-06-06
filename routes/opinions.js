const router = require('express').Router()
const opinionsCtrl = require('../controllers/opinions.js')
const middleware = require('../middleware/auth.js')

const { decodeUserFromToken, checkAuth } = middleware

/*---------- Public Routes ----------*/


/*---------- Protected Routes ----------*/
router.use(decodeUserFromToken)
router.post('/', checkAuth, opinionsCtrl.castOpinion)

module.exports = router