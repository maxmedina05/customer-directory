class CustomerNotFoundException extends Error {
  constructor(...args) {
    super(...args);

    this.name = "CUSTOMER_NOT_FOUND_EXCEPTION";
    this.message = "Customer was not found!";
    Error.captureStackTrace(this, CustomerNotFoundException);
  }
}

module.exports = {
  CustomerNotFoundException
};
