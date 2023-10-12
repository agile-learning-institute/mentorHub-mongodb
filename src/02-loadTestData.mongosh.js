console.log("loadTestData Initiated");

// Load Enumerations
console.log("\tLoading Enumerator Data");
const enumerator_data = require('/src/institute-enumirators-data.json');
console.log(db.getCollection('enumerators').insertMany(enumerator_data));

// Load Partner Data
console.log("\tLoading Partner Data");
const partner_data = require('/src/institute-partner-data.json')
console.log(db.getCollection('partners').insertMany(partner_data));

// Load Person Data
console.log("\tLoading Person Data to Temp");
const personData = require('/src/institute-person-data.json')
console.log("\tPerson Data Loaded");
console.log(db.getCollection('people').insertMany(personData));

// Build query to populate final collections and update references
const pipeline = [
    {
        $lookup: {
            from: "people",
            localField: "mentorName",
            foreignField: "name",
            as: "mentorInfo"
        }
    },
    {
        $lookup: {
            from: "partners",
            localField: "partnerName",
            foreignField: "name",
            as: "partnerInfo"
        }
    },
    {
        $project: {
            mentorId: { $arrayElemAt: ["$mentorInfo._id", 0] },
            partnerId: { $arrayElemAt: ["$partnerInfo._id", 0] }
            // mentorName: 0,
            // partnerName: 0
        }
    },
    {
        $out: "people"
    }
];

// db.temp_people.aggregate(pipeline);
// console.log("\tAggregation Executed");

// Drop temp_people collection
// db.temp_people.drop();
// console.log("\tTemporary Table Dropped");

console.log("loadTestData complete");
