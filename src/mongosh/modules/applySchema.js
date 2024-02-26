// Function to check and create constraints (if no VERSION document exists)
function applySchema(config) {
  
  // Check to see if a Version document exits
  var versionDoc = db[config.name].findOne({ name: "VERSION" });
  if (versionDoc) {
    console.log("-Version Found:", versionDoc.version);
    return;
  }
    
  console.log("-Version Not Found, Configuring:", config.name);
    
  // create name index
  db[config.name].createIndex({ name: 1 }, { unique: true });
  console.log("-Name Index created");
  
  // Skip Enumerators Config of Enumerators collection 
  const schema = require("./schemas/" + config.name + "-" + config.version + ".json");
  if (config.name === "enumerators") {
    console.log("-Enumerators - Skipping enumerators load");
    return;
  }

  // Configure Schema Enumerators
  console.log("-Loading Enumerators");
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

  // Insert version document
  db[config.name].insertOne({ name: "VERSION", version: config.version });
  console.log("-Version Set", config.version);
}