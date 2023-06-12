const router = require('express').Router()
const epicsCtrl = require('../controllers/epics')
const middleware = require('../middleware/auth.js')

const { decodeUserFromToken, checkAuth } = middleware


/*---------- Public Routes ----------*/

/*---------- Protected Routes ----------*/
router.use(decodeUserFromToken)
router.get('/:imageId', checkAuth, epicsCtrl.getEpic)

module.exports = router
