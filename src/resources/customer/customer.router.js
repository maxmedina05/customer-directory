const express = require("express");
const router = express.Router();
const {
  getAllcustomer,
  addCustomer,
  deleteCustomer,
  getCustomer,
  updateCustomer
} = require("./customer.controller");

/**
 * @swagger
 * /customers:
 *   get:
 *     tags:
 *       - Customers
 *     summary: Get all customers
 *     produces:
 *       - application/json
 *     parameters:
 *      - name: offset
 *        in: query
 *        description: Indicates how many customers to skip. (Use this to handle pagination)
 *        default: 0
 *      - name: page
 *        in: query
 *        description: Indicates the current page to return. (Use this to handle pagination)
 *        default: 0
 *      - name: limit
 *        in: query
 *        description: Indicates how many customers to return.
 *        default: 20
 *      - name: fields
 *        in: query
 *        description: Indicates the customer's fields to be return in each object. Use - prefixes to return all fields except some specific fields.
 *        default: ''
 *      - name: sort
 *        in: query
 *        description: Indicates the fields to sort in ascending order. Use - prefixes to sort in descending order.
 *        default: ''
 *     responses:
 *       200:
 *         description: Return an object containing an array of customers
 *       400:
 *         description: Error
 */
router.get("/", getAllcustomer);

/**
 * @swagger
 * /customers:
 *   post:
 *     tags:
 *       - Customers
 *     summary: Add a new customer
 *     consumes:
 *       - application/json
 *     produces:
 *       - application/json
 *     parameters:
 *      - name: customer
 *        in: body
 *        required: true
 *        schema:
 *         $ref: '#/definitions/Customer'
 *     responses:
 *       201:
 *         description: successful operation
 *       400:
 *         description: Error
 */
router.post("/", addCustomer);

/**
 * @swagger
 * /customers/{customerId}:
 *   delete:
 *     tags:
 *       - Customers
 *     summary: Deletes a customer
 *     produces:
 *       - application/json
 *     parameters:
 *      - name: number
 *        in: param
 *        description: The Id of the customer to delete.
 *        required: true
 *     responses:
 *       200:
 *         description: Return an object containing the deleted customer
 *       400:
 *         description: Error
 */
router.delete("/:customerId", deleteCustomer);

/**
 * @swagger
 * /customers/{customerId}:
 *   get:
 *     tags:
 *       - Customers
 *     summary: Get a customer by its customerId.
 *     produces:
 *       - application/json
 *     parameters:
 *      - name: customerId
 *        in: param
 *        description: The customerId of customer that needs to be found.
 *        required: true
 *     responses:
 *       200:
 *         description: Return an object containing the customer
 *       400:
 *         description: Error
 */

router.get("/:customerId", getCustomer);

/**
 * @swagger
 * /customers/{customerId}:
 *   put:
 *     tags:
 *       - Customers
 *     summary: Updates an existing customer
 *     consumes:
 *       - application/json
 *     produces:
 *       - application/json
 *     parameters:
 *      - name: customerId
 *        in: param
 *        description: The customerId of customer that needs to update.
 *        required: true
 *      - name: customer
 *        in: body
 *        required: true
 *        schema:
 *         $ref: '#/definitions/Customer'
 *     responses:
 *       200:
 *         description: Return an object containing the updated customer
 *       400:
 *         description: Error
 */
router.put("/:customerId", updateCustomer);

module.exports = router;
