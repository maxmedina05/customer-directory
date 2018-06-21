const Customer = require('./customer.schema');
const { CustomerNotFoundException } = require('./customer.exception');
const Agp = require('api-query-params');

async function getAllcustomer(req, res) {
  try {
    const {
      filter,
      skip = 0,
      limit = 20,
      sort,
      projection = { __v: 0, createdAt: 0, modifiedAt: 0 }
    } = Agp(req.query);
    const total = await Customer.count(filter);
    const customers = await Customer.find(filter)
      .find(filter)
      .skip(skip)
      .limit(limit)
      .select(projection)
      .sort(sort);

    res.set('X-Total-Count', total);
    res.json({
      payload: customers,
      count: customers.length,
      total
    });
  } catch (err) {
    res.status(400).json({
      payload: null,
      error: err.message || err
    });
  }
}

async function addCustomer(req, res) {
  const {
    name,
    birthday,
    gender,
    lastContact,
    customerLifetimeValue
  } = req.body;

  try {
    const newCustomer = await Customer.create({
      name,
      birthday,
      gender,
      lastContact,
      customerLifetimeValue
    });

    res.status(201).json({
      payload: newCustomer,
      error: false
    });
  } catch (err) {
    res.status(400).json({
      payload: null,
      error: err
    });
  }
}

async function getCustomer(req, res) {
  const { customerID } = req.params;
  try {
    const customer = await Customer.findOne(
      { customerID: customerID },
      { __v: 0, createdAt: 0, modifiedAt: 0 }
    );
    if (!customer) {
      throw new CustomerNotFoundException();
    }

    res.json({ payload: customer });
  } catch (err) {
    res.status(400).json({
      payload: null,
      error: err.message || err
    });
  }
}

async function updateCustomer(req, res) {
  const { customerID } = req.params;
  const {
    name,
    birthday,
    gender,
    lastContact,
    customerLifetimeValue
  } = req.body;

  try {
    const customer = await Customer.findOne({ customerID });

    if (!customer) {
      throw new CustomerNotFoundException();
    }

    customer.name = name ? name : customer.name;
    customer.birthday = birthday ? birthday : customer.birthday;
    customer.gender = gender ? gender : customer.gender;
    customer.lastContact = lastContact ? lastContact : customer.lastContact;
    customer.customerLifetimeValue = customerLifetimeValue
      ? customerLifetimeValue
      : customer.customerLifetimeValue;

    res.json({ payload: customer });
  } catch (err) {
    res.status(400).json({
      payload: null,
      error: err.message || err
    });
  }
}

async function deleteCustomer(req, res) {
  const customerID = req.params.customerID;
  try {
    const deletedCustomer = await Customer.deleteOne({
      customerID
    });

    if (!deletedCustomer) {
      throw new CustomerNotFoundException();
    }

    res.status(204).json({ payload: deletedCustomer });
  } catch (err) {
    res.status(400).json({ payload: null, error: err });
  }
}

module.exports = {
  getAllcustomer,
  addCustomer,
  deleteCustomer,
  getCustomer,
  updateCustomer
};
