module.export = app => {
  const teams = require('../models/team.controller.js')

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
    teams.validte('updateTeam'),
    teams.update)

  // delete team
  app.delete('/teams/:teamId', teams.delete)

  // delete all teams
  app.delete('/teams', teams.deleteAll)

  app.use('/api/teams', router)
}