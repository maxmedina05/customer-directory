const app = require("express")();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const BASE_API_URL = "/api/v1";
const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost/customerDB";
const PORT = process.env.PORT || 3000;

const resources = require("./src/resources");
const customerResource = resources.customer;

bodyParser.urlencoded({ extended: true });
app.use(bodyParser.json());
mongoose.connect(MONGO_URI);

app.use(`${BASE_API_URL}/customers`, customerResource.router);

app.listen(PORT, () => {
  console.log("App running on port:", PORT);
});
