const sql = require('./db.js')

const Team = function(team) {
  this.id = team.id
  this.name = team.name
  this.coach_id = team.coach_id
  this.league_id = team.league_id
  this.notes = team.notes
  this.motto = team.motto
}

Team.create = (newTeam, result) => {
  sql.query('insert into teams set ?', newTeam, (err, res) => {
    if (err) {
      console.log('error: ', err)
      result(err, null)
      return
    }

    console.log('info:', 'team created: ', { id: res.inserId, ...newTeam })
    result(null, { id: res.insertId, ...newTeam})
  })
}



module.exports = Team;
