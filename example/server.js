const express = require('express')
const bodyParser = require('body-parser')
const webpack = require('webpack')
const webpackDevMiddleware = require('webpack-dev-middleware')
const webpackHotMiddleware = require('webpack-hot-middleware')
const webpackConfig = require('./webpack.config')
const fs = require('fs')
const childProcess = require('child_process')

const app = express()
const compiler = webpack(webpackConfig)

app.use(webpackDevMiddleware(compiler, {
  publicPath: webpackConfig.output.publicPath,
  stats: {
    colors: true,
    chunks: false
  }
}))

app.use(webpackHotMiddleware(compiler))

app.use(express.static(__dirname))

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

const router = express.Router()

/**
 * Simple
 */
router.get('/simple/get', (req, res) => {
  res.json({
    msg: 'Hello'
  })
})

/**
 * Base
 */
router.get('/base/get', (req, res) => {
  res.json({
    msg: req.query
  })
})
router.post('/base/post', (req, res) => {
  res.json({
    msg: req.body
  })
})
router.post('/base/buffer', (req, res) => {
  let msg = []
  req.on('data', (chunk) => {
    if (chunk) {
      msg.push(chunk)
    }
  })
  req.on('end', () => {
    let buf = Buffer.concat(msg)
    res.json(buf.toJSON())
  })
})
router.get('/base/error', (req, res) => {
  if (Math.random() > 0.5) {
    res.json({
      msg: 'good error request'
    })
  } else {
    res.status(500)
    res.json({
      msg: 'bad error requeest'
    })
  }
})
router.get('/base/timeout', (req, res) => {
  setTimeout(() => {
    res.json({
      msg: 'good timeout request'
    })
  }, 3000)
})

/**
 * Extend
 */
router.get('/extend/get', (req, res) => {
  res.json({
    msg: 'get'
  })
})
router.options('/extend/options', (req, res) => {
  res.end()
})
router.delete('/extend/delete', (req, res) => {
  res.end()
})
router.head('/extend/head', (req, res) => {
  res.end()
})
router.post('/extend/post', (req, res) => {
  res.json({
    msg: req.body
  })
})
router.put('/extend/put', (req, res) => {
  res.json({
    msg: req.body
  })
})
router.patch('/extend/patch', (req, res) => {
  res.json({
    msg: req.body
  })
})
router.get('/extend/user', (req, res) => {
  res.json({
    code: 0,
    messsage: 'ok',
    result: {
      name: 'Brain',
      age: 24
    }
  })
})

/**
 * Interceptor
 */
router.get('/interceptor/get', (req, res) => {
  res.end('')
})

/**
 * Config
 */
router.post('/config/post', (req, res) => {
  res.json({
    msg: req.body
  })
})

app.use(router)

module.exports = app.listen(3000, () => {
  console.log('server running at 3000...')
  // childProcess.exec('start http://localhost:3000/')
})
