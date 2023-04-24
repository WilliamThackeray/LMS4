

module.exports = app => {
  const teams = require('../controllers/team.controller.js')

  var router = require('express').Router()

  // new team
  app.post('/teams',
    teams.validate('createTeam'),
    teams.create)
  
  // get all teams
  app.get('/teams', teams.findAll)

  // get single team using id
  app.get('/teams/:teamId', teams.findOne)

  // update team using id
  app.put('/teams/:teamId',
    teams.validate('updateTeam'),
    teams.update)

  // delete team
  app.delete('/teams/:teamId', teams.delete)

  // delete all teams
  app.delete('/teams', teams.deleteAll)

  app.use('/api/teams', router)
}