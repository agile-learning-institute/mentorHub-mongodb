// Function to check and create constraints (if no VERSION document exists)
function applySchema(config) {
  
  // Check to see if a Version document exits
  var versionDoc = db[config.name].findOne({ name: "VERSION" });
  if (versionDoc) {
    console.log("-Version Found:", versionDoc.version);
    return;
  }
    
  // Insert version document
  db[config.name].insertOne({ name: "VERSION", version: config.version });
  console.log("-Version Set", config.version);

  // create indexes
  console.log("-Creating Indexes", config.version);
  config.indexes.forEach(index => {
    const keys = index.keys;
    const options = index.options;
    db[config.name].createIndex(index.keys, index.options);
    console.log("  -Created Index", index.keys);
  });
  
  // Skip Schema Constraints for Enumerators 
  if (config.name === "enumerators") {
    console.log("-Enumerators - Skipping enumerators load");
    return;
  }
  
  // Configure Schema Enumerators
  console.log("-Loading Enumerators");
  const schema = require("./schemas/" + config.name + "-" + config.version + ".json");
  const enumerators = require("./data/enumerators.json");
  Object.keys(enumerators[0][config.name]).forEach(attribute => {
    const keys = Object.keys(enumerators[0][config.name][attribute]);
    const type = schema.properties[attribute].bsonType;
    var element = schema.properties[attribute];
    if (type === "array") {element = element.items;}
    console.log("-Enumerators Loading ", attribute);
    element.enum = keys;
  })
  
  // Add last saved breadcrumb to schema
  console.log("-Adding Breadcrumb")
  const breadcrumb = require("./schemas/breadcrumb.json");
  schema.properties["lastSaved"] = breadcrumb;

  // Configure schema validation
  db.runCommand({
    collMod: config.name,
    validator: { $jsonSchema: schema },
  });
  console.log("- Schema Configured");
}