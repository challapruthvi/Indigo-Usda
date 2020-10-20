const express = require("express");
const bodyParser = require("body-parser");

const app = express();
const PORT = process.env.PORT || 5000;  // set port, listen for requests

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to USDA crops API" });
});

require("./app/routes/crops.route.js")(app);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});