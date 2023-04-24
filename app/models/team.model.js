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

Team.findById = (id, result) => {
  sql.query(`select * from teams where id = ${id}`, (err, res) => {
    if (err) {
      console.log('err: ', err)
      result(err, null)
      return
    }  

    if (res.length) {
      console.log('info: found team: ', res[0])
      result(null, res[0])
      return
    }

    result({ kind: 'not_found' }, null)
  })
}

Team.getAll = (title, result) => {
  let query = 'select * from teams'

  if (title) {
    query += ` where title like '%${title}%'`
  }

  sql.query(query, (err, res) => {
    if (err) {
      console.log('err: ', err)
      result(null, err)
      return
    }

    console.log('info: teams: ', res)
    result(null, res)
  })
}

Team.updateById = (id, team, result) => {
  sql.query(
    'update teams set id = ?, name = ?, coach_id = ?, league_id = ?, notes = ?, motto = ?',
    [team.id, team.name, team.coach_id, team.league_id, team.notes, team.motto],
    (err, res) => {
      if (err) {
        console.log('err: ', err)
        result(null, err)
        return
      }

      if (res.affectedRows == 0) {
        // couldn't find team
        result({ kind: 'not_found' }, null)
        return
      }

      console.log('info: updated team: ', { id: id, ...team })
      result(null, { id: id, ...team })
    }
  )
}

Team.remove = (id, result) => {
  sql.query('delete form teams where id = ?', id, (err, res) => {
    if (err) {
      console.log('err: ', err)
      result(null, err)
      return
    }

    if (res.affectedRows == 0) {
      // team not found
      result({ kind: 'not_found'}, null)
      return
    }

    console.log('info: team deleted with id: ', id)
    result(null, res)
  })
}

Team.removeAll = result => {
  sql.query('delete from teams', (err, res) => {
    if (err) {
      console.log('err: ', err)
      result(null, err)
      return
    }

    console.log(`info: deleted ${res.affectedRows} teams.`)
    result(null, res)
  })
}

module.exports = Team;
