#!/bin/bash

# Import data into temporary collections
mongoimport --db myDatabase --collection enumerators --file /data/institute-enumerators-data.json
mongoimport --db myDatabase --collection partners --file /data/institute-partners-data.json
mongoimport --db myDatabase --collection temp_people --file /data/institute-people-data.json

# Run MongoDB script to populate final collections and update references
mongo <<EOF

# build query with 
# use $lookup to find mentorId
# use $lookup to find partnerId
# project with mentorID and partnerId
# set out to people
EOF
