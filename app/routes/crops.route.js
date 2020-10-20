module.exports = app => {
    const crops = require("../controllers/crops.controller.js");
  
    // 1
    app.get("/get_total_harvest_per_year", crops.totalHarvestPerYear);
  
    app.get("/get_total_yield_per_year", crops.totalYieldForAllYears);

    // 2
    app.get("/get_avg_total_yield_per_year", crops.avgYieldPerYear);
  
    // 3
    app.get("/get_harvest_for_all_states", crops.harvestAllStates);
  
    // 4
    app.get("/get_avg_yield_for_all_states", crops.yieldAllStates);
  
    // 5
    app.get("/get_harvest_for_all_counties_in_state", crops.harvestAllCounties);
  
    // // 6
    // app.get("/get_yield_for_all_counties_in_state", crops.findAll);
  
    // 7
    app.get("/get_individual_crops_harvest_per_county", crops.cropsHarvestPerCounty);
  
    // 8
    app.get("/get_individual_crops_avg_yield_per_county", crops.cropsYieldPerCounty);
  
  };