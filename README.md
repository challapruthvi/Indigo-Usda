# usda

1. Install MySQL server and create schema/database 'usda'; update config/db.config.js
2. Install modules:
    <br />  npm install
2. Import data:
    <br />  node data/createTables.js
    <br />  node data/insertVocabs.js
    <br />  node data/insertData.js
3. Run app:
    <br />  node server.js
