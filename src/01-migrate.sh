#!/bin/bash

# Connect to MongoDB and create the database and collections
mongo <<EOF

##############################
# Create the database
##############################
use agile-learning-institute;

##############################
# Create enumerators collection
##############################
enumerators_schema=$(< /schemas/institute-enumerators-schema.json)
db.createCollection("enumerators");
db.enumerators.createIndex({ "name": 1 }, { unique: true })
db.runCommand({collMod: "enumerators",validator: {\$jsonSchema: $enumerators_schema}});

##############################
# Create the partner collection
##############################
partner_schema=$(< /schemas/institute-partner-schema.json)
db.createCollection("partners");
db.partners.createIndex({ "name": 1 }, { unique: true });
db.runCommand({collMod: "partners",validator: {\$jsonSchema: $partner_schema}});

##############################
# Create the people collection
##############################
people_schema=$(< /schemas/institute-people-schema.json)
db.createCollection("people");
db.people.createIndex({ "name": 1 }, { unique: true });
db.runCommand({collMod: "people",validator: {\$jsonSchema: $people_schema}});

EOF