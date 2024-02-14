# Mongo Database Standards

## Table of Contents

- [Database Collections](#database-collections)
- [Enumerations and Data Quality](#enumerations-and-data-quality)
- [Scehma Versioning pattern](#scehma-versioning-pattern)
- [Name attribute and unique index](#name-attribute-and-unique-index)
- [Status Attribute](#status-attribute)
- [Test Data](#test-data)
- [ObjectId's](#objectids)
- [Breadcrumbs](#breadcrumbs)

## Database Collections

- **People**: contains data related to the individuals associated with the institute
- **Partners**: represents entities or organizations that collaborate with the institute
- **Topics**: contains information regarding different educational topics with skills and resources.
- **Resources**: A learning Resource used to gain a skill.
- **Skills**: A skill to have, something that would go on a resume.
- **Encounters**: An encounter between a mentor and mentee
- **EncounterPlans**: A template for an encounter
- **Enumerators**: Master lists for enumerated values and descriptions.

## Enumerations and Data Quality

Many schema's specify an enumerated list of valid values to ensure high data quality. In order to provide additional context about the meaning of the individual values, and to support user interfaces that frequently need the list of valid values, we have the enumerators collection. This collection hosts a single document that identifies all of the enumerated values by collection, with a description for each.

## Scehma Versioning pattern

The [migrate.js](./src/mongosh/migrate.js) file automates schema deployment, and implements a semantic versioning approach (major.minor.patch). Every collection has a version document with a name and version attribute. Ther name of the version document is ``VERSION``. This is how we define the different levels of change:

- Major Changes are reserved for Schema changes that will have breaking impact downstream, such as the introduction of a new required property, or the removal of a property. Major changes frequently require migration Scripts.
- Minor changes are non-breaking schema updates that support new functionality. Minor updates do not require schema migration logic.
- Patch level updates are non-breaking schema updates that require no new downstream coding, such as adding new a enumerator value.

## Name attribute and unique index

Every collection has a ``name`` attribute, with a unique index. Any string value is allowed, but we prefer to use a 'slug'. A slug is a short, user-friendly, spaceless string that facilitates automation. This approach enhances the usability and accessibility of our data. A common pattern used for slugs is ``"^\S{32}$"``

## Status attribute

Every collection has a status attribute with an enumerated list valid values. Every collection should support at least ``Active`` and ``Archived`` statuses. The archived status is our soft delete indicator.

## Test Data

- Test data is used to validate the functionality and performance of the software during testing. The [migrate.js](./src/mongosh/migrate.js) script takes advantage of a predefined variable (``loadTest``) which is set in the [``entrypoint.sh``](./src/mongosh/entrypoint.sh) script based on the ``LOAD_TEST`` environment variable. This is the indicator that test data should be loaded. This value is set to ``true`` in the [test.sh](./src/mongosh/test.sh), or in the appropriate [docker-compose.yaml](https://github.com/agile-learning-institute/mentorHub/blob/main/docker-configurations/docker-compose.yaml) file.

### ObjectIDs

- **Definition**: ObjectIDs are unique identifiers assigned to objects within a database, particularly in MongoDB databases. Mongodb object id's are typically 24-byte strings, containing a hexidecimal value. The _id property is required in every mongo document, and if a unique value is not provided it is generated for you.

Importance in Testing

- Test data should include ObjectIDs to simulate realistic data scenarios and ensure data integrity during testing. This requires that we specifiy predictible values, so that our test data can have referential integerty ensuring that cross collection references contain the proper objectId value.

Our scripts take advantage of mongodb EJSON (extended JSON) standards. This allows us to leverage the ``$oid`` relaxed definition and generate predectible object IDs. Properties that should have ObjectID values will use the "$oid" syntax followed by the hexidecimal representation of the ObjectID value. Here is an example:

    `"_id": {
    "$oid": "bbbb00000000000000000001"
    }`

## BreadCrumbs

- Every collection should have a "lastSaved" object, that identifies the IP address, user UUID, timestamp, and http correlation ID that was responsible for the most recent updates to the document. This will support both issue root cause investigations, as well as a data lake that allows you to "time-travel" across the history of a document.
