const mongoose = require('mongoose');
const Counter = require('../counter.schema');

/**
 * @swagger
 * definitions:
 *   Customer:
 *     properties:
 *       customerID:
 *         type: string
 *       name:
 *         type: object
 *          properties:
 *            first:
 *              type: string
 *            last:
 *              type: string
 *       birthday:
 *         type: string
 *       gender:
 *         type: string
 *       lastContact:
 *         type: date
 *       customerLifetimeValue:
 *         type: number
 *         $ref: '#/definitions/Customer'
 */
const customerSchema = new mongoose.Schema({
  customerID: { type: Number },
  name: {
    first: { type: String, default: '' },
    last: { type: String, default: '' }
  },
  birthday: { type: String, default: '' },
  gender: { type: String, default: '', maxlength: 1 },
  lastContact: { type: Date, default: Date.now },
  customerLifetimeValue: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now },
  modifiedAt: { type: Date, default: Date.now },
  timezoneOffset: { type: Number, default: new Date().getTimezoneOffset() }
});

// TODO: write script for setting up database
customerSchema.pre('save', async function(next) {
  const counter = await Counter.findByIdAndUpdate(
    { _id: 'customerID' },
    { $inc: { seq: 1 } }
  );
  console.log(counter);
  this.customerID = counter;
  next();
});

module.exports = mongoose.model('Customer', customerSchema);
