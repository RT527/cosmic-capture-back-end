const router = require('express').Router()
const epicsCtrl = require('../controllers/epics')
const middleware = require('../middleware/auth.js')

const { decodeUserFromToken } = middleware


/*---------- Public Routes ----------*/

/*---------- Protected Routes ----------*/
router.use(decodeUserFromToken)
router.get('/:imageId', epicsCtrl.getEpic)

module.exports = router
