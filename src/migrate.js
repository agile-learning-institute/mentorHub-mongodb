
// Function to check and create collection
function checkAndCreateCollection(collectionName) {
    console.log("*************************************");
    console.log("***** ",collectionName);
    console.log("*************************************");
    var collectionNames = db.getCollectionNames();
    if (collectionNames.indexOf(collectionName) === -1) {
        db.createCollection(collectionName);
        console.log("Collection Created:", collectionName);
    }
}

// Function to check and create constraints (if no VERSION document exists)
function checkAndCreateConstraints(collectionName, schemaFile, dataFile, initialVersion) {
    var versionDoc = db[collectionName].findOne({"name": "VERSION"});
    if (!versionDoc) {
        console.log("Version Not Found, Configuring:",collectionName);
        
        // create name index
        db[collectionName].createIndex({ "name": 1 }, { unique: true });
        console.log("\tName Index created");

        // Confiure schema validation
        const schema = require(schemaFile);
        console.log("\tSchema read");
        db.runCommand({collMod: collectionName, validator: {$jsonSchema: schema}});
        console.log("\tValidator Configured");
        
        // Insert version document
        db[collectionName].insertOne({"name": "VERSION", "version":initialVersion });
        console.log("\tVersion Configured");

        // Load Test Data
        const data = require(dataFile);
        console.log("\tTest Data Loaded");
        console.log(db.getCollection(collectionName).insertMany(data));
        console.log("Configured!");
    }
}

// Function to check and upgrade constraints
function checkAndUpgradeConstraints(collectionName, targetVersion) {
    var versionDoc = db[collectionName].findOne({ "metadata": { "type": "version" } });
    if (versionDoc && versionDoc.version < targetVersion) {
        console.log("Version Upgrade Start");
        // Code to upgrade constraints goes here

        // Update version document
        db[collectionName].update({"name": "VERSION", "version":targetVersion });
        console.log("Version Upgrade Complete");
    }
}

// Usage
var collections = [
    { 
        name: "enumerators", 
        schemaFile: '/src/institute-enumirators-schema.json', 
        dataFile: '/src/institute-enumirators-data.json', 
        initialVersion: "1.1.T", 
        targetVersion: "1.1.T" 
    },
    { 
        name: "partners", 
        schemaFile: '/src/institute-partner-schema.json', 
        dataFile: '/src/institute-partner-data.json', 
        initialVersion: "1.1.T", 
        targetVersion: "1.1.T" 
    },
    { 
        name: "people", 
        schemaFile: '/src/institute-people-schema.json', 
        dataFile: '/src/institute-people-data.json', 
        initialVersion: "1.1.T", 
        targetVersion: "1.1.T" 
    },
    // Add more collections here
];

collections.forEach(function(collection) {
    checkAndCreateCollection(collection.name);
    checkAndCreateConstraints(collection.name, collection.schemaFile, collection.dataFile, collection.initialVersion);
    checkAndUpgradeConstraints(collection.name, collection.schemaFile, collection.targetVersion);
});

console.log("############ COMPLETE ################");