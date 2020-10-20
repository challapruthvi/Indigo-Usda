const mysql = require("mysql");
const dbConfig = require("../app/config/db.config.js");

var connection = mysql.createConnection({
  host: dbConfig.HOST,
  user: dbConfig.USER,
  password: dbConfig.PASSWORD,
  database: dbConfig.DB
});

connection.connect(function(err) {
    if (err) {
      return console.error('error: ' + err.message);
    }
    
    var createFipsTable = `CREATE TABLE IF NOT EXISTS usda_fips_code_location(
        fips_code int NOT NULL,
        county_name varchar(255) NOT NULL,
        state_code varchar(255) NOT NULL,
        CONSTRAINT PK_FIPS PRIMARY KEY (fips_code,county_name)
    )`;

    connection.query(createFipsTable, function(err, results, fields) {
        if (err) {
            console.log(err.message);
        }
    });

    var createCropsTable = `CREATE TABLE IF NOT EXISTS usda_crops(
        crop_id int AUTO_INCREMENT PRIMARY KEY,
        crop varchar(255) NOT NULL UNIQUE
    )`;

    connection.query(createCropsTable, function(err, results, fields) {
        if (err) {
            console.log(err.message);
        }
    });

    var createUsdaCropsDataTable = `CREATE TABLE IF NOT EXISTS usda_crops_data(
        crop_id int NOT NULL,
        fips_code int NOT NULL,
        year int NOT NULL,
        total_harvested_acres int NOT NULL,
        total_yield decimal(8,2),
        CONSTRAINT PK_USDA PRIMARY KEY (crop_id,fips_code,year),
        FOREIGN KEY (fips_code) REFERENCES usda_fips_code_location(fips_code),
        FOREIGN KEY (crop_id) REFERENCES usda_crops(crop_id)
    )`;

    connection.query(createUsdaCropsDataTable, function(err, results, fields) {
        if (err) {
            console.log(err.message);
        }
    });

    connection.end(function(err) {
      if (err) {
        return console.log(err.message);
      }
    });
  });