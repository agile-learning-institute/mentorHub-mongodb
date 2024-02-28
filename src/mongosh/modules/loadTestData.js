// Load Test Data
function loadTestData(config) {
  console.log("Loading Test Data");
  const dataFile = "./data/" + config.name + ".json";

  try {
    const result = db
      .getCollection(config.name)
      .insertMany(
        EJSON.deserialize(JSON.parse(fs.readFileSync(dataFile, "utf-8")))
      );
    const count = Object.keys(result.insertedIds).length;
    console.log(count, " Documents Inserted");
  } catch (error) {
    console.log("Load Error Occured", error);
    throw error; 
  }
}
