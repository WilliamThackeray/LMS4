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

exports.create = (req, res) => {
  // validate
  if (!req.body) {
    res.status(400).send({
      message: 'err: Content cannot be empty.'
    })
  }
  
  // create team
  const team = new Team({
    id: req.body.id,
    name: req.body.name,
    coach_id: req.body.coach_id,
    league_id: req.body.league_id,
    notes: req.body.notes,
    motto: req.body.motto
  })

  // Save customer to DB
  Teams.create(team, (err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || 'err: Some error occured while creating the new team.'
      })
    else res.sennd(data)
  })
}

exports.findAll = async () => {
  const title = req.query.title

  Team.getAll(title, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || 'err: Some error occurred while getting teams.'
      })
    else res.send(data)
  })
}

exports.findOne = async () => {
  Team.apply.findById(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === 'not_found') {
        res.status(404).send({
          message: `err: Not found team with id ${req.params.id}.`
        })
      } else {
        res.status(500).send({
          message: `err: Error retreiving team with id ${req.params.id}`
        })
      }
    } else res.send(data)
  })
}

exports.update = async () => {
  // validate
  if (!req.body) {
    res.status(400).send({
      message: 'err: Content cannot be empty.'
    })
  }
  
  console.log(req.body)

  Team.updateById(
    req.params.id,
    new Team(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === 'not_found') {
          res.status(404).send({
            message: `err: Team not found with id ${req.params.id}.`
          })
        } else {
          res.status(500).send({
            message: `err: Error updating team with id ${req.param.id}.`
          })
        }
      } else res.send(data)
    }
  )
}

exports.delete = async () => {
  
}

exports.deleteAll = async () => {
  
}