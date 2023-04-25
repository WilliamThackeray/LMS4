const sql = require('./db.js')

const Lookup = function(lookup) {
  this.lookupTable = lookup.lookupTable
}

Lookup.look = (options, result) => {
  let query = ''
  switch (options.params.lookupTable) {
    case 'coaches':
      query = "SELECT CONCAT(first_name, ' ', last_name) as label, id as value FROM people WHERE person_type='coach'";
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

// async version. TODO: convert to req/res
// app.get("/lookups/:lookupTable", async (req, res) => {
//   try {
//     let query = "";
//     switch (req.params.lookupTable) {
//       case 'coaches':
//         query = "SELECT CONCAT(first_name, ' ', last_name) as label, id as value FROM people WHERE person_type='coach'";
//         break;
//       case 'teams':
//         c
//     }
//     let result = sql.query(query)
//     console.log('result: ', result)
//     res.send(result);
//   }
//   catch (err) {
//     res.send(err);
//     console.log(err.message);
//   }
// });