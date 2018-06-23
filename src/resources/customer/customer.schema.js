const mongoose = require('mongoose');
const Counter = require('../counter.schema');

/**
 * @swagger
 * definitions:
 *   Customer:
 *     properties:
 *       customerID:
 *         type: number
 *       name:
 *         type: object
 *         properties:
 *            first:
 *              type: string
 *            last:
 *              type: string
 *       birthday:
 *         type: string
 *       gender:
 *         type: string
 *       lastContact:
 *         type: dateTime
 *       customerLifetimeValue:
 *         type: number
 *         $ref: '#/definitions/Customer'
 */
const customerSchema = new mongoose.Schema({
  customerID: { type: Number, default: 0, unique: true },
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

customerSchema.pre('save', async function(next) {
  if (this.customerID !== 0) {
    this.modifiedAt = new Date();
    return next();
  }

  try {
    let counter = await Counter.findByIdAndUpdate('customerID', {
      $inc: { seq: 1 }
    });
    if (!counter) {
      counter = new Counter({ _id: 'customerID', seq: 1 });
      await counter.save();
      this.customerID = counter.seq;
      next();
    } else {
      this.customerID = counter.seq;
      next();
    }
  } catch (e) {
    next(e);
  }
});

module.exports = mongoose.model('Customer', customerSchema);
