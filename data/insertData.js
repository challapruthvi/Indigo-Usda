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

const csvFilePath = "usda_crops_5yr.csv";

function getCropIds(callback){
    var lookupCropIds = {};
    connection.connect(function(err) {
        if (err) {
          return console.error('error: ' + err.message);
        }
        
        connection.query("SELECT * FROM usda_crops", function (err, result) {
            if (err) {
                callback(err,null)
            } else {
                for(let i = 0; i < result.length; i++){ 
                    lookupCropIds[result[i].crop] = result[i].crop_id;
                }
                callback(null,lookupCropIds);
            }
        });
        
      });
}

getCropIds(function(err,cropIds){
    if (err) {
        console.log("ERROR : ",err);            
    } else {
        console.log(cropIds);
        csv()
        .fromFile(csvFilePath)
        .then(function(jsonArrayObj){ 
            for(let i = 0; i < jsonArrayObj.length; i++){ 
                jsonArrayObj[i]['CROP_ID'] = cropIds[jsonArrayObj[i].CROP]
                delete jsonArrayObj[i]['CROP']
                delete jsonArrayObj[i]['COUNTY_NAME']
                delete jsonArrayObj[i]['STATE_CODE']
            }   

            var cropsRecords = jsonArrayObj.map(crop => [crop.CROP_ID, crop.FIPS_CODE, crop.YEAR, crop.TOTAL_HARVESTED_ACRES, crop.TOTAL_YIELD]);
            var cropsRecordsInsert = "INSERT INTO usda_crops_data (crop_id, fips_code, year, total_harvested_acres, total_yield) VALUES ?";
            connection.query("SET SESSION sql_mode = ''");
            connection.query(cropsRecordsInsert, [cropsRecords], function(err) {
                if (err) {
                    console.log(err.message);
                }
            });

            connection.end();
        });
    }
});



 