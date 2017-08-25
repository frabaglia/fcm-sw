import express from 'express'
import welcome from '../controllers/welcome'
import token from '../controllers/token'
import status from '../controllers/status'

module.exports = (app) => {
  let router = express.Router()
  router.get('/', welcome)
  router.get('/status', status(app))
  router.get('/token/:token', token(app))
  return router
}
