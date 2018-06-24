const Agp = require('api-query-params');
const Customer = require('./customer.schema');
const { CustomerNotFoundException } = require('./customer.exception');
const { chopProperties } = require('../utils');

const propertiesBackList = [
  'createdAt',
  'modifiedAt',
  'timezoneOffset',
  '_id',
  '__v'
];

async function searchCustomers(req, res) {
  try {
    let { q, skip = 0, limit = 20 } = req.query;

    skip = Number.parseInt(skip);
    limit = Number.parseInt(limit);

    const filter = {
      $or: [
        { 'name.first': new RegExp(q, 'i') },
        { 'name.last': new RegExp(q, 'i') }
      ]
    };

    const total = await Customer.count(filter);
    let customers = await Customer.find(filter)
      .skip(skip)
      .limit(limit);

    res.json({
      payload: customers,
      total,
      count: customers.length
    });
  } catch (err) {
    res.status(400).json({ payload: null, error: buildError(err) });
  }
}

async function getAllcustomer(req, res) {
  try {
    const {
      filter,
      skip = 0,
      limit = 20,
      sort,
      projection = {
        _id: 0,
        __v: 0,
        createdAt: 0,
        modifiedAt: 0,
        timezoneOffset: 0
      }
    } = Agp(req.query);
    const total = await Customer.count(filter);
    let customers = await Customer.find(filter)
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
    res.status(400).json({ payload: null, error: buildError(err) });
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
    let newCustomer = await Customer.create({
      name,
      birthday,
      gender,
      lastContact,
      customerLifetimeValue
    });

    newCustomer = chopProperties(newCustomer, propertiesBackList);

    res.status(201).json({
      payload: newCustomer,
      error: false
    });
  } catch (err) {
    res.status(400).json({ payload: null, error: buildError(err) });
  }
}

async function getCustomer(req, res) {
  const { customerID } = req.params;
  try {
    const customer = await Customer.findOne(
      { customerID: customerID },
      {
        _id: 0,
        __v: 0,
        createdAt: 0,
        modifiedAt: 0,
        timezoneOffset: 0
      }
    );
    if (!customer) {
      throw new CustomerNotFoundException();
    }

    res.json({ payload: customer });
  } catch (err) {
    res.status(400).json({ payload: null, error: buildError(err) });
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
    let customer = await Customer.findOne({ customerID });

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

    await customer.save();
    customer = chopProperties(customer, propertiesBackList);

    res.json({ payload: customer });
  } catch (err) {
    res.status(400).json({ payload: null, error: buildError(err) });
  }
}

async function deleteCustomer(req, res) {
  const customerID = req.params.customerID;
  try {
    let customerToDelete = await Customer.findOne({
      customerID
    });

    if (!customerToDelete) {
      throw new CustomerNotFoundException();
    }

    await customerToDelete.remove();

    res.status(204).send();
  } catch (err) {
    res.status(400).json({ payload: null, error: buildError(err) });
  }
}

function buildError(error) {
  return {
    name: error.name,
    message: error.message
  };
}

module.exports = {
  getAllcustomer,
  addCustomer,
  deleteCustomer,
  getCustomer,
  updateCustomer,
  searchCustomers
};
