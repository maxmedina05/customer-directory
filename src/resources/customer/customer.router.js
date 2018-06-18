const express = require("express");
const router = express.Router();
const { getAllcustomer, addCustomer } = require("./customer.controller");

router.get("/", getAllcustomer);
router.post("/", addCustomer);

module.exports = router;
