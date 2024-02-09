#!/bin/bash

mongosh --host $HOST -u $USER -p $PASSWORD --authenticationDatabase $AUTH_DB $DB_NAME --eval "var loadTest=$LOAD_TEST; load('$SCRIPT_PATH')"

