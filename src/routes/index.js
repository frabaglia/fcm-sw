import express from 'express'
import welcome from '../controllers/welcome'
import token from '../controllers/token'

var router = express.Router()

router.get('/', welcome)
router.get('/token/:token', token)

module.exports = router
