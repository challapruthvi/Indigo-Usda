const Crop = require("../models/crops.model.js");

exports.totalHarvestPerYear = (req, res) => {
  Crop.totalHarvestPerYear((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving harvest."
      });
    else res.json(data);
  });
};

exports.totalYieldForAllYears = (req, res) => {
  Crop.totalYieldForAllYears((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving total yield."
      });
    else res.json(data);
  });
};


exports.avgYieldPerYear = (req, res) => {
  Crop.avgYieldPerYear(req.query.year, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found year ${req.query.year}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving the year " + req.query.year
        });
      }
    } else res.send(data);
  });
};

exports.harvestAllStates = (req, res) => {
  Crop.harvestAllStates(req.query.year, req.query.crop, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: "Not found"
        });
      } else {
        res.status(500).send({
          message: "Error retrieving data"
        });
      }
    } else res.send(data);
  });
};

exports.yieldAllStates = (req, res) => {
  Crop.yieldAllStates(req.query.year, req.query.crop, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: "Not found"
        });
      } else {
        res.status(500).send({
          message: "Error retrieving data"
        });
      }
    } else res.send(data);
  });
};

exports.harvestAllCounties = (req, res) => {
  Crop.harvestAllCounties(req.query.year, req.query.state, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: "Not found"
        });
      } else {
        res.status(500).send({
          message: "Error retrieving data"
        });
      }
    } else res.send(data);
  });
};

exports.cropsHarvestPerCounty = (req, res) => {
  Crop.cropsHarvestPerCounty(req.query.year, req.query.state, req.query.county,  (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: "Not found"
        });
      } else {
        res.status(500).send({
          message: "Error retrieving data"
        });
      }
    } else res.send(data);
  });
};

exports.cropsYieldPerCounty = (req, res) => {
  Crop.cropsYieldPerCounty(req.query.year, req.query.state, req.query.county,  (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: "Not found"
        });
      } else {
        res.status(500).send({
          message: "Error retrieving data"
        });
      }
    } else res.send(data);
  });
};
