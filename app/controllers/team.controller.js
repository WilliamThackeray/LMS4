const Team = require('../models/team.model.js')
const util = require('./controller.util.js')

const { body, validationResult } = require('express-validator')

exports.validate = (method) => {
  let rules = [
    body('name', 'name cannot be empty').not().isEmpty().trim().escape(),
    body('coach_id', 'coach id cannot be empty').not().isEmpty().trim().escape(),
    body('league_id', 'leauge_id cannot be empty').not().isEmpty().trim().escape(),
    body('notes').trim().escape(),
    body('motto').trim().escape()
  ]
  switch (method) {
    case 'updateTeam':
      return rules
    case 'createTeam':
      let createRules = [...rules]
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
  // const errs = validationResult(req)
  
  // if (!errs.isEmpty()) {
  //   res.status(422).send({
  //     message: errs.array()
  //   })
  // }

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
  Team.create(team, (err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || 'err: Some error occured while creating the new team.'
      })
    else {

      res.status(201).send(data)
    }
  })
}

exports.findAll = (req, res) => {
  const title = req.query.title

  Team.getAll(title, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || 'err: Some error occurred while getting teams.'
      })
    else res.status(200).send(data)
  })
}

exports.findOne = (req, res) => {
  Team.findById(req.params.teamId, (err, data) => {
    if (err) {
      if (err.kind === 'not_found') {
        res.status(404).send({
          message: `err: No team found with id ${req.params.id}.`
        })
      } else {
        res.status(500).send({
          message: `err: Error retreiving team with id ${req.params.id}`
        })
      }
    } else res.status(200).send(data)
  })
}

exports.update = (req, res) => {
  // validate
  // const errs = validationResult(req)
  
  // if (!errs.isEmpty()) {
  //   res.status(422).send({
  //     message: errs.array()
  //   })
  // }

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
      } else res.status(200).send(data)
    }
  )
}

exports.delete = (req, res) => {
  Team.remove(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === 'not_found') {
        res.status(404).send({
          message: `err: Not found customer with id ${req.params.id}`
        })
      } else {
        res.status(500).send({
          message: `err: Could not delete customer with id ${req.params.id}`
        })
      }
    } else res.status(200).send({ message: `info: Team was successfully deleted.`})
  })
}

exports.deleteAll = (req, res) => {
  Team.removeAll( (err, data) => {
    if (err)
      res.status(500).send({
        message: err.message ||
          'err: Error occurred while removing all teams.'
      })
    else res.status(200).send({ message: 'All teams were removed successfully.'})
  })
}