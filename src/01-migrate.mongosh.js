// Create enumerators collection
console.log("Starting Enumerators");
db.createCollection("enumerators");
console.log("\tcollection created");
db.enumerators.createIndex({ "name": 1 }, { unique: true });
console.log("\tindex created");
const enumerators_schema = require('/src/institute-enumirators-schema.json')
console.log("\tschema read");
db.runCommand({collMod: "enumerators", validator: {$jsonSchema: enumerators_schema}});
console.log("\tvalidator applied");

// Create the partner collection
console.log("Starting Partner");
db.createCollection("partners");
console.log("\tCollection Created");
db.partners.createIndex({ "name": 1 }, { unique: true });
console.log("\tIndex created");
const partner_schema = require("/src/institute-partner-schema.json");
console.log("\tschema read");
db.runCommand({collMod: "partners", validator: {$jsonSchema: partner_schema}});
console.log("\tvalidator applied");

// Create the people collection
console.log("Starting people");
db.createCollection("people");
console.log("\tPeople Collection Created");
// db.people.createIndex({ "name": 1 }, { unique: true });
// console.log("\tPeople Index Created");
const people_schema = require("/src/institute-people-schema.json");
console.log("\tSchema read");
// db.runCommand({collMod: "people", validator: {$jsonSchema: people_schema}});
// console.log("\tvalidator applied");

console.log("Migration Complete!");
