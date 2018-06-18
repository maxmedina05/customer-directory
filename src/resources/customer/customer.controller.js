const Customer = require("./customer.schema");

async function getAllcustomer(req, res) {}

async function addCustomer(req, res) {
  const {
    name,
    birthday,
    gender,
    lastContact,
    customerLifetimeValue
  } = req.body;

  try {
    const newCustomer = new Customer({
      name,
      birthday,
      gender,
      lastContact,
      customerLifetimeValue
    });

    await newCustomer.save();

    res.status(201).json(newCustomer);
  } catch (err) {
    res.status(400).json({
      payload: null,
      error: err
    });
  }
}

module.exports = {
  getAllcustomer,
  addCustomer
};
