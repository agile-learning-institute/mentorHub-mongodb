// Function to add enumerators to a schema
// NOTE: This is a recurssive function that iterates over the nested enumerators structure.
function addEnumerators(enumerators, schema, padding) {

  // Iterate over enumerators
  Object.keys(enumerators).forEach(key => {
    const enumeratorValues = Object.keys(enumerators[key]);
    const firstChild = enumerators[key][enumeratorValues[0]];

    // If we are pointing to an array, shift to point to the array items
    let schemaElement = schema[key];
    if (schemaElement.bsonType === 'array') { schemaElement = schemaElement.items;}
    
    if (typeof firstChild === 'string') {
      console.log(padding, "Setting ", key, " enums to:", JSON.stringify(enumeratorValues, null, 0));
      schemaElement.enum = enumeratorValues;
    } else {
      console.log(padding, "Processing: ", key);
      addEnumerators(enumerators[key], schemaElement.properties, '  ' + padding);
    }
  });
}
