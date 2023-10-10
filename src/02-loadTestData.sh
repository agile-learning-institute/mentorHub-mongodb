#!/bin/bash

# Import data into temporary collections
mongoimport --db agile-learning-institute --collection enumerators --file /testData/institute-enumerators-data.json
mongoimport --db agile-learning-institute --collection partners --file /testData/institute-partners-data.json
mongoimport --db agile-learning-institute --collection temp_people --file /testData/institute-people-data.json

# Run MongoDB script to populate final collections and update references
mongo <<EOF

use agile-learning-institute;

// Build query to populate final collections and update references
db.temp_people.aggregate([
    {
        \$lookup: {
            from: "people",
            localField: "mentorName",
            foreignField: "name",
            as: "mentorInfo"
        }
    },
    {
        \$lookup: {
            from: "partners",
            localField: "partnerName",
            foreignField: "name",
            as: "partnerInfo"
        }
    },
    {
        \$project: {
            mentorId: { \$arrayElemAt: ["\$mentorInfo._id", 0] },
            partnerId: { \$arrayElemAt: ["\$partnerInfo._id", 0] },
            mentorName: 0,
            partnerName: 0
        }
    },
    {
        \$out: "people"
    }
]);

// Drop temp_people collection
db.temp_people.drop();

EOF
