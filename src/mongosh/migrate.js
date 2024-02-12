
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
        console.log("\tVersion Set");

        // Load Test Data
        if (loadTest===true) {
            console.log("\tLoading Test Data");
            const data = require(dataFile);
            result = db.getCollection(collectionName).insertMany(data);
            count = Object.keys(result.insertedIds).length;
            console.log("\t", count, " Documents Inserted");
        }
    }
}

// Function to check and upgrade constraints
function checkAndUpgradeConstraints(collectionName, targetVersion) {
    var versionDoc = db[collectionName].findOne({ "metadata": { "type": "version" } });
    if (versionDoc && versionDoc.version < targetVersion) {
        console.log("\tVersion Upgrade Start");
        // Code to upgrade constraints goes here

        // Update version document
        db[collectionName].update({"name": "VERSION", "version":targetVersion });
        console.log("\tVersion Upgrade Complete");
    }
}

// Setup Collections
var collections = [
    {
        name: "enumerators",
        schemaFile: './institute-enumirators-schema.json',
        dataFile: './institute-enumirators-data.json',
        initialVersion: "2.0.2",
        targetVersion: "2.0.2"
    },
    {
        name: "partners",
        schemaFile: './institute-partner-schema.json',
        dataFile: './institute-partner-data.json',
        initialVersion: "1.1.1",
        targetVersion: "1.1.1"
    },
    {
        name: "people",
        schemaFile: './institute-people-schema.json',
        dataFile: './institute-people-data.json',
        initialVersion: "1.2.2",
        targetVersion: "1.2.2"
    },
    {
        name: "topics",
        schemaFile: './institute-topics-schema.json',
        dataFile: './institute-topics-data.json',
        initialVersion: "1.1.0",
        targetVersion: "1.1.0"
    },
    // Add more collections here
];
console.log("############ STARTING ################ loadTestData:", loadTest)

collections.forEach(function(collection) {
    checkAndCreateCollection(collection.name);
    checkAndCreateConstraints(collection.name, collection.schemaFile, collection.dataFile, collection.initialVersion);
    checkAndUpgradeConstraints(collection.name, collection.targetVersion);
});

console.log("############ COMPLETE ################ Version 2.0.4");