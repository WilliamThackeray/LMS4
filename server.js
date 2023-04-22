const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const expressValidator = require('express-validator')

const app = express()

app.request(cors())

app.use(bodyParser.json())

app.use(bodyParser.urlencoded({ extended: true }))

app.get('/', (req, res) => {
  res.json({ message: `Welcome to wthackeray's application.` })
})

require('./app/routes/customer.routes.js')(app);

app.listen(8081, () => {
  console.log(`Server is running on port 8081.`)
})
