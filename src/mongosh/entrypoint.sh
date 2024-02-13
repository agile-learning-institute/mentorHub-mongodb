#!/bin/bash

# Environment Variables
#   HOST - MongoDB Host Name
#   USER - MongoDB User Name
#   PASSWORD - MongoDB Password
#   AUTH_DB - Authorization DB typically admin
#   DB_NAME - Database Name, typically agile-learning-institute
#   LOAD_TEST - Boolean to control loading test data true/false

for FILE in ./config
do
  echo "Processing $FILE..."
  mongosh --host $HOST -u $USER -p $PASSWORD --authenticationDatabase $AUTH_DB $DB_NAME --eval "var loadTest=$LOAD_TEST; var configFile=$FILE; load('migrate.js')"
done


