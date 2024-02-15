// Load Test Data
function loadTestData(config) {
  console.log("\tLoading Test Data");
  const dataFile = path.join(process.env.SCRIPT_PATH, 'data', config.name + ".json");

  try {
    const result = db
      .getCollection(config.name)
      .insertMany(
        EJSON.deserialize(JSON.parse(fs.readFileSync(dataFile, "utf-8")))
      );
    const count = Object.keys(result.insertedIds).length;
    console.log("\t", count, " Documents Inserted");
  } catch (error) {
    console.log("\t Load Error Occured", error);
  }
}
