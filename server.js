const dotenv = require('dotenv')
dotenv.config()
const express = require('express')
const app = express()
const routes = require('./routes')
const db = require('./db')

app.use(express.json())
app.use(express.urlencoded({extended: false}))

app.set('view engine', 'ejs')
app.set('views', 'views')

app.use(routes)

db.connect({expressApp: app})

app.on('db_connected', () => {
  app.listen(process.env.PORT, () => {
    console.log('Listening port', process.env.PORT)
  })
})
