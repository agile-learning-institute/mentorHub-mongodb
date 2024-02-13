// Function to check and create collection
function createCollection(config) {
  var collectionName = config.name;
  var collectionNames = db.getCollectionNames();
  if (collectionNames.indexOf(collectionName) === -1) {
    db.createCollection(collectionName);
    console.log("- Collection Created:", collectionName);
  } else {
    console.log("- Collection Exists:", collectionName);
  }
}
