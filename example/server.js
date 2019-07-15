const express = require('express')
const bodyParser = require('body-parser')
const webpack = require('webpack')
const webpackDevMiddleware = require('webpack-dev-middleware')
const webpackHotMiddleware = require('webpack-hot-middleware')
const webpackConfig = require('./webpack.config')
const fs = require('fs')

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

router.get('/simple/get', (req, res) => {
  res.json({
    msg: 'Hello'
  })
})

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

app.use(router)

module.exports = app.listen(3000, () => {
  console.log('server running at 3000...')
})
