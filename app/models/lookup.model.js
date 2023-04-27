

const sql = require('./db.js')


function Lookup(req, result) {
  let query = ''
  switch (req.params.lookupTable) {
    case 'coacheslist':
      query = "SELECT CONCAT(first_name, ' ', last_name) as label, id as value FROM people WHERE person_type='coach'";
        break;
    case 'coachesData':
      query = `select concat(p.first_name, ' ', p.last_name) as fullName, p.id, p.email, p.phone, p.team_id from people p where p.person_type = 'coach'`
      break;
    case 'teams':
      query = "SELECT name as label, id as value FROM teams";
      break;
  }
  sql.query(query, (err, res) => {
    if (err) {
      console.log('err: ', err)
      result(err, null)
      return
    }

    result(null, res)
  })
}

module.exports = Lookup