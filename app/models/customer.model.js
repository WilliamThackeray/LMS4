const sql = require('./db.js')

const Customer = function(customer) {
  this.name = customer.name
  this.description = customer.description
  this.published = customer.published
}

Customer.create = (newCustomer, result) => {
  sql.query('insert into customers set ?', newCustomer, (err, res) => {
    if (err) {
      console.log('error: ', err)
      result(err, null)
      return
    }

    console.log('created customer: ', { id: res.insertId, ...newCustomer })
    result(nnull, { id: res.insertId, ...newCustomer})
  })
}

Customer.findById = (id, result) => {
  sql.query(`select * from customers where id = ${id}`, (err, res) => {
    if (err) {
      console.log('error: ', err)
      result(err, null)
      return
    }

    if (res.length) {
      console.log('found customer: ', res[0])
      result(null, res[0])
      return
    }

    result({ kind: 'not_found' }, null)
  })
}

Customer.getAll = (title, result) => {
  let query = "SELECT * FROM customers"

  if (title) {
    query += ` WHERE title LIKE '%${title}%'`
  }

  sql.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err)
      result(null, err)
      return
    }

    console.log("customers: ", res)
    result(null, res);
  })
}

Customer.getAllPublished = result => {
  sql.query("SELECT * FROM customers WHERE published=true", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("customers: ", res);
    result(null, res);
  });
};

Customer.updateById = (id, tutorial, result) => {
  sql.query(
    "UPDATE customers SET title = ?, description = ?, published = ? WHERE id = ?",
    [tutorial.title, tutorial.description, tutorial.published, id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found Customer with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated tutorial: ", { id: id, ...tutorial });
      result(null, { id: id, ...tutorial });
    }
  );
};

Customer.remove = (id, result) => {
  sql.query("DELETE FROM customers WHERE id = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found Customer with the id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted tutorial with id: ", id);
    result(null, res);
  });
};

Customer.removeAll = result => {
  sql.query("DELETE FROM customers", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} customers`);
    result(null, res);
  });
};

module.exports = Customer;