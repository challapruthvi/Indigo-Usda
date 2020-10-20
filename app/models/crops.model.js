const sql = require("./db.js");

// constructor
class Crop {
  constructor() {}
}

// 1
Crop.totalHarvestPerYear = result => {
  sql.query("SELECT year, SUM(total_harvested_acres) total_harvested_acres FROM usda_crops_data GROUP BY year ORDER BY year ASC", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("crops: ", res);
    result(null, res);
  });
};

Crop.totalYieldForAllYears = (result) => {
  sql.query("SELECT year, SUM(total_yield) AS total_yield FROM usda_crops_data GROUP BY year ORDER BY year ASC", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("total yield of crops: ", res);
    result(null, res);
  });
};

//2 
Crop.avgYieldPerYear = (year, result) => {
  sql.query(`SELECT AVG(total_yield) AS total_yield FROM usda_crops_data where year = ${year}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found year: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found Customer with the id  
    result({ kind: "not_found" }, null);
  });
};

//3
Crop.harvestAllStates = (year, crop, result) => {
  var query = `SELECT ufcl.state_code, SUM(ucd.total_harvested_acres) total_harvested_acres FROM usda_crops_data ucd, usda_crops uc, usda_fips_code_location ufcl 
  where ucd.crop_id = uc.crop_id and ucd.fips_code = ufcl.fips_code and ucd.year = ${year} `;
  if (crop){
    crop = crop.replace(",", "','");
    query = query + `and uc.crop IN ('${crop}') `;
  }
  query = query +  `GROUP BY ucd.year, ufcl.state_code ORDER BY ufcl.state_code ASC;`;
  sql.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found year: ", res[0]);
      result(null, res);
      return;
    }

    // not found Customer with the id  
    result({ kind: "not_found" }, null);
  });
};

//4
Crop.yieldAllStates = (year, crop, result) => {
  var query = `SELECT ufcl.state_code, AVG(ucd.total_yield) total_yield FROM usda_crops_data ucd, usda_crops uc, usda_fips_code_location ufcl 
  where ucd.crop_id = uc.crop_id and ucd.fips_code = ufcl.fips_code and ucd.year = ${year} `;
  if (crop){
    crop = crop.replace(",", "','");
    query = query + `and uc.crop IN ('${crop}') `;
  }
  query = query +  `GROUP BY ucd.year, ufcl.state_code ORDER BY ufcl.state_code ASC;`;
  sql.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found year: ", res[0]);
      result(null, res);
      return;
    }

    // not found Customer with the id  
    result({ kind: "not_found" }, null);
  });
};

//5
Crop.harvestAllCounties = (year, state, result) => {
  var query = `SELECT ucd.fips_code, ufcl.county_name, ucd.total_harvested_acres FROM usda_crops_data ucd, usda_fips_code_location ufcl 
  where ucd.fips_code = ufcl.fips_code and ucd.year = ${year} and ufcl.state_code = '${state}'  
  GROUP BY ucd.fips_code ORDER BY ufcl.county_name ASC;`;
  sql.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found year: ", res[0]);
      result(null, res);
      return;
    }

    // not found Customer with the id  
    result({ kind: "not_found" }, null);
  });
};

//7
Crop.cropsHarvestPerCounty = (year, state, county, result) => {
  var query = `SELECT uc.crop, ucd.total_harvested_acres FROM usda_crops_data ucd, usda_crops uc, usda_fips_code_location ufcl 
  where ucd.crop_id = uc.crop_id and ucd.fips_code = ufcl.fips_code and ucd.year = ${year} and ufcl.state_code = '${state}' and  ufcl.county_name = '${county}'
  ORDER BY ufcl.county_name ASC;`;
  sql.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found year: ", res[0]);
      result(null, res);
      return;
    }

    // not found Customer with the id  
    result({ kind: "not_found" }, null);
  });
};

//8
Crop.cropsYieldPerCounty = (year, state, county, result) => {
  var query = `SELECT uc.crop, ucd.total_yield FROM usda_crops_data ucd, usda_crops uc, usda_fips_code_location ufcl 
  where ucd.crop_id = uc.crop_id and ucd.fips_code = ufcl.fips_code and ucd.year = ${year} and ufcl.state_code = '${state}' and  ufcl.county_name = '${county}'
  ORDER BY ufcl.county_name ASC;`;
  sql.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found year: ", res[0]);
      result(null, res);
      return;
    }

    // not found Customer with the id  
    result({ kind: "not_found" }, null);
  });
};

module.exports = Crop;