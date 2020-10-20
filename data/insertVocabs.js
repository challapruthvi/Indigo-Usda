const fs = require('fs'); 
const csv = require('csvtojson');
const mysql = require("mysql");
const dbConfig = require("../app/config/db.config.js");

var connection = mysql.createConnection({
  host: dbConfig.HOST,
  user: dbConfig.USER,
  password: dbConfig.PASSWORD,
  database: dbConfig.DB
});

const csvFilePath = "./usda_crops_5yr.csv";

csv()
  .fromFile(csvFilePath)
  .then(function(jsonArrayObj){ //when parse finished, result will be emitted here.
    console.log(jsonArrayObj); 
    var lookupFipsCode = {};
    var lookupCrops = {};
    var resultFipsCode = [];
    var resultCrops = [];

     for (var item, i = 0; item = jsonArrayObj[i++];) {
        var fipsCode = item.FIPS_CODE;
        var county = item.COUNTY_NAME;
        var stateCode = item.STATE_CODE;
        var crop = item.CROP;
      
        if (!(fipsCode in lookupFipsCode)) {
            lookupFipsCode[fipsCode] = 1;
            resultFipsCode.push([fipsCode, county, stateCode]);
        }

        if (!(crop in lookupCrops)) {
            lookupCrops[crop] = 1;
            resultCrops.push([crop]);
        }
      }

      connection.connect(function(err) {
        if (err) {
          return console.error('error: ' + err.message);
        }
        
        var fipsCodeInsert = "INSERT INTO usda_fips_code_location (fips_code, county_name, state_code) VALUES ?";
        connection.query(fipsCodeInsert, [resultFipsCode], function(err) {
            if (err) {
                console.log(err.message);
            }
        });

        var cropInsert = "INSERT INTO usda_crops (crop) VALUES ?";
        connection.query(cropInsert, [resultCrops], function(err) {
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
   });
