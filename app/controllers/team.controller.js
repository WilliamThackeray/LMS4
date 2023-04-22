const Team = require('../models/team.model.js')
const util = require('./controller.util.js')





exports.validate = (method) => {
  let rules = [
    body('name', 'name cannot be empty'.not().isEmpty().trim().escape()),
    body('coach_id', 'coach id cannot be empty'.not().isEmpty().trim().escape()),
    body('name', 'name cannot be empty'.not().isEmpty().trim().escape()),
    body('notes').trim().escape(),
    body('motto').trim().escape()
  ]
  switch (method) {
    case 'updateTeam':
      return rules
    case 'createTeam':
      let creatRules = [...rules]
      createRules.push(
        body('name').custom(async (value) => {
          return await Team.checkDuplicateName(value)
        })
      )
    return createRules
  }
}