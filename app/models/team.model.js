const sql = require('./db.js')

const Team = function(team) {
  this.name = team.name
  this.coach_id = team.coach_id
  this.coach_phone = team.coach_phone
  this.coach_email = team.coach_email
}




module.exports = Team;
