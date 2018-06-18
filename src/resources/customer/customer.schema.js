const mongoose = require("mongoose");
const counter = require("../counter.schema");

/**
 * @swagger
 * definitions:
 *   Customer:
 *     properties:
 *       customerId:
 *         type: string
 *       name:
 *         type: string
 *       birthday:
 *         type: string
 *       gender:
 *         type: string
 *       address:
 *         type: object
 *         $ref: '#/definitions/Customer'
 */
const customerSchema = new mongoose.Schema({
  customerId: { type: Number },
  name: {
    first: { type: String, default: "" },
    last: { type: String, default: "" }
  },
  birthday: { type: String, default: "" },
  gender: { type: String, default: "", maxlength: 1 },
  lastContact: { type: Date, default: Date.now },
  customerLifetimeValue: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now },
  modifiedAt: { type: Date, default: Date.now },
  timezoneOffset: { type: Number, default: new Date().getTimezoneOffset() }
});

// TODO: write script for setting up database
customerSchema.pre("save", function(next) {
  let self = this;

  counter.findByIdAndUpdate(
    { _id: "customerId" },
    { $inc: { seq: 1 } },
    (err, nextCustomer) => {
      if (err) {
        return next(err);
      }
      self.customerId = nextCustomer.seq;
      next();
    }
  );
});

module.exports = mongoose.model("Customer", customerSchema);
