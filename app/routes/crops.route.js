module.exports = app => {
    const crops = require("../controllers/crops.controller.js");
  
    app.get("/get_total_harvest_per_year", crops.totalHarvestPerYear);
  
    app.get("/get_total_yield_per_year", crops.totalYieldForAllYears);

    app.get("/get_avg_total_yield_per_year", crops.avgYieldPerYear);
  
    app.get("/get_harvest_for_all_states", crops.harvestAllStates);
  
    app.get("/get_avg_yield_for_all_states", crops.yieldAllStates);
  
    app.get("/get_harvest_for_all_counties_in_state", crops.harvestAllCounties);
  
    app.get("/get_individual_crops_harvest_per_county", crops.cropsHarvestPerCounty);
  
    app.get("/get_individual_crops_avg_yield_per_county", crops.cropsYieldPerCounty);
  
  };