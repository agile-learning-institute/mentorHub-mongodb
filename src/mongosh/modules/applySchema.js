// Function to check and create constraints (if no VERSION document exists)
function applySchema(config) {
  const schemaFile = "./schemas/" + config.name + "-" + config.version + ".json";
  const enumeratorsFile = "./data/enumerators.json";

  // Check to see if a Version document exits
  var versionDoc = db[config.name].findOne({ name: "VERSION" });
  if (versionDoc) {
    console.log("-Version Found:", versionDoc.version);
  } else {
    console.log("-Version Not Found, Configuring:", config.name);

    // create name index
    db[config.name].createIndex({ name: 1 }, { unique: true });
    console.log("-Name Index created");

    // Add Enumerators to Schema
    const schema = require(schemaFile);
    if (config.name !== "enumerators") {
      const enumerators = require(enumeratorsFile);
      Object.keys(enumerators[0][config.name]).forEach(attribute => {
        const keys = Object.keys(enumerators[0][config.name][attribute]);
        const type = schema.properties[attribute].bsonType;
        var element = schema.properties[attribute];
        if (type === "array") {element = element.items;}
        console.log("-Enumerators Loading ", attribute);
        element.enum = keys;
      })
    }

    // Configure schema validation
    db.runCommand({
      collMod: config.name,
      validator: { $jsonSchema: schema },
    });
    console.log("- Schema Configured");

    // Insert version document
    db[config.name].insertOne({ name: "VERSION", version: config.version });
    console.log("-Version Set", config.version);
  }
}