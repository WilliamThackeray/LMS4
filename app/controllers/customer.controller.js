const Customer = require("../models/customer.model.js");

// Create and Save a new Customer
exports.create = (req, res) => {
  // Validate
  if (!req.body) {
    res.status(400).send({
      message: 'Content cannot be empty.'
    })
  }

  // create customer
  const customer = new Customer({
    name: req.body.title,
    description: req.body.description,
    published: req.body.published || false
  })

  // save customer to DB
  Customer.create(customer, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || 'Some error occurred while creating the customer.'
      })
    else res.send(data)
  })
};

// Retrieve all Customers from the database (with condition).
exports.findAll = (req, res) => {
  const title = req.query.title

  Customer.getAll(title, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || 'Some error occurred while retrieving customers.'
      })
    else res.send(data)
  })
};

// Find a single Customer with a id
exports.findOne = (req, res) => {
  Customer.findById(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === 'not_found') {
        res.status(400).send({
          message: `Not found customer with id ${req.params.id}.`
        })
      } else {
        res.status(500).send({
          message: `Error retrieving customer with id ${req.params.id}`
        })
      }
    } else res.send(data)
  })
};

// find all published Customers
exports.findAllPublished = (req, res) => {
  Customer.getAllPublished((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || 'Some error occurred while retrieving customers.'
      })
    else res.send(data)
  })
};

// Update a Customer identified by the id in the request
exports.update = (req, res) => {
  // validate
  if (!req.body) {
    res.status(400).send({
      message: 'Content cannot be empty.'
    })
  }

  console.log(req.body)

  Customer.updateById(
    req.params.id,
    new Customer(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === 'not_found') {
          res.status(404).send({
            message: `Not found customer with id ${req.params.id}.`
          })
        } else {
          res.status(500).send({
            message: `Error updating customer with id ${req.params.id}.`
          })
        }
      } else res.send(data)
    }
  )
};

// Delete a Customer with the specified id in the request
exports.delete = (req, res) => {
  Customer.remove(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === 'not_found') {
        res.status(404).send({
          message: `Not found customer with id ${req.params.id}.`
        })
      } else {
        res.status(500).send({
          message: `Could not delete customer with id ${req.params.id}`
        })
      }
    } else res.send({ message: `Customer was success fully deleted.`})
  })
};

// Delete all Customers from the database.
exports.deleteAll = (req, res) => {
  Customer.removeAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || 'Some error occurred while removing all customers.'
      })
    else res.send({ message: 'All customers were removed successfully.'})
  })
};
