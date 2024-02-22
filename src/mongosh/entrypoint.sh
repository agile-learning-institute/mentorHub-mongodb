#!/bin/bash

# Environment Variables used by this script
#   HOST - MongoDB Host Name
#   USER - MongoDB User Name
#   PASSWORD - MongoDB Password
#   AUTH_DB - Authorization DB typically admin
#   DB_NAME - Database Name, typically agile-learning-institute
#   LOAD_TEST - Boolean to control loading test data true/false

for FILE in ./config/*; do
  # Skip hidden files
  if [[ $(basename "$FILE") == .* ]]; then
    continue
  fi

  echo "================================================================================"
  echo "==========  entrypoint.sh is Processing $FILE $(date)"
  mongosh --host $HOST -u $USER -p $PASSWORD --authenticationDatabase $AUTH_DB $DB_NAME --eval "var loadTest='$LOAD_TEST'; var configFile='$FILE'; load('migrate.js')"
  if [ $? -ne 0 ]; then
      echo "!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!"
      echo "!!!!! Processing Collection $FILE has failed at $(date)"
      echo "!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!"
      exit 1
  fi
  echo "==========  entrypoint.sh Processed $FILE successfully $(date)"
  echo "================================================================================"
  echo 
done

echo 
echo
echo "================================================================================"
echo "========== SUCCESS!!!!                                                =========="
echo "================================================================================"
