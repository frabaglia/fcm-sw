"use strict"
import express from 'express'
import path from 'path'
import favicon from 'serve-favicon'
import logger from 'morgan'
import cookieParser from 'cookie-parser'
import bodyParser from 'body-parser'
import RateLimit from 'express-rate-limit'
import helmet from 'helmet'
import babelEnvLogger from './utils/env-logger'
import routes from './routes/index'

/* This function is just a helper to let you know how is the server running without inspecting npm scripts. */
/* If it bothers, you can delete it right now. */
babelEnvLogger(process.env.ENV)

let app = express()

/* Rate limiter */
var limiter = new RateLimit({
  windowMs: 1000, // 1 minute
  max: 25, // Limit each IP to 100 requests per windowMs
  delayMs: 0 // Disable delaying - Full speed until the max limit is reached
})

/* Applying rate limiter to all requests */
app.use(limiter)

/* Setting secure headers */
app.use(helmet())

/* Template engine */
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'jade')

/* Morgan logger */
app.use(logger('dev'))

/* Body parsing */
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
    extended: false
}))
app.use(cookieParser())

/* Statinc serving */
app.use(express.static(path.join(__dirname, '../public')))

/* Main routing */
app.use('/', routes)

/* 404 handling */
app.use((req, res, next) => {
    let err = new Error('Not found.')
    err.status = 404
    next(err)
})

/* 500 handling */
if (process.env.ENV === 'dev') {
    app.use((err, req, res, next) => {
        res.status(err.status || 500)
        res.send({
            message: err.message,
            status: err.status,
            error: err
        })
    })
}

app.use((err, req, res, next) => {
    res.status(err.status || 500)
    res.send({
        message: err.message,
        status: err.status,
        err: {}
    })
})

module.exports = app
