// This script is used to create a collection, 
//  load a schema, and optionally load test data.
// The script assumes that the following variables have been established
// - loadTest is a string with a value of "true" or "false"
// - configFile is the configuration file to be used
//
// See entrypoint.sh for the code that calls this script

load('./modules/createCollection.js');
load('./modules/applySchema.js');
load('./modules/loadTestData.js');
const config = require(configFile);

console.log("############ STARTING ################ loadTestData:", loadTest);
console.log("***** ", config.name );
console.log("*************************************");

createCollection(collection);
applySchema(collection);
if (loadTest === true) {
  loadTestData(collection);
}

// Future migration features - requires scripts to self execute
// for script in config.migrations {
//    load(script);
// }

console.log("############ COMPLETE ################");
