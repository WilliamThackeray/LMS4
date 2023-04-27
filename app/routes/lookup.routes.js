

module.exports = app => {
  const lookup = require('../models/lookup.model.js')

  app.get('/lookups/:lookupTable', (req, res) => {
    lookup(req, (err, data) => {
      if (err) {
        console.log(err)
        res.status(500).send({
          message: `err: Error when looking up data.`
        })
      }
      res.status(200).send(data)
    })
  })
}
