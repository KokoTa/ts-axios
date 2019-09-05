const express = require('express')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')

const app = express()

app.use(express.static(__dirname))

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cookieParser())

const router = express.Router()

/**
 * More
 */
const cors = {
  'Access-Control-Allow-Origin': 'http://localhost:3000',
  'Access-Control-Allow-Methods': 'GET, POST, PATCH, PUT, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, test',
  'Access-Control-Allow-Credentials': true,
}
// 非简单请求的跨域都会先发送 options 请求
router.options('*', (req, res) => {
  res.set(cors)
  res.end()
})
router.get('/more/get', (req, res) => {
  res.set(cors)
  res.json(req.cookies)
})

app.use(router)

module.exports = app.listen(8888, () => {
  console.log('server running at 8888...')
  // childProcess.exec('start http://localhost:8888/')
})
