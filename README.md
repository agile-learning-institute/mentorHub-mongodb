# mentorhub-mongodb

This project contains database configuration, migration scripts, and test data used by the institute system. The Dockerfile creates a mongosh container that connects to a database and runs the scripts to configure the database and load test data.

[Here](https://github.com/orgs/agile-learning-institute/repositories?q=mentorHub-&type=all&sort=name) are all of the repositories in the [mentorHub](https://github.com/agile-learning-institute/mentorhub/tree/main) system

## Prerequisites

- [Docker Desktop](https://www.docker.com/products/docker-desktop/)
- [Install mongosh](https://www.mongodb.com/docs/mongodb-shell/install/)

### Optionally

- [Python](https://www.python.org/downloads/) - if you want to run the Topic Scraper
- [Mongo Compass](https://www.mongodb.com/try/download/compass) - if you want a way to look into the database, the connection string will be

```html
mongodb://root:example@localhost:27017/?tls=false&directConnection=true
```

## Contributing

The javascript files found in ```./src/mongosh``` are used to build the institute-mongosh container. This container connects to a mongo database and runs a mongosh script to create collections, version documents, load test data, and implement json schema based constraints. The entrypoint.sh script, connects to the database based on environment variables, and then executes the migrate.js script.

The ```main``` branch is locked as read-only. You should do all work in a feature branch, and when you are ready to have your code deployed to the cloud open a pull request against that feature branch. Do not open a pull request without first building and testing the containers locally

```bash
cd ./src/topic-scraper
pip install -r requirements.txt
python scrape_engineerkit.py
```

## Database Standards

### Collection Standards

**People**: contains data related to the individuals associated with the institute

- individual profiles, roles or positions, and any other relevant personal details

**Partners**: represents entities or organizations that collaborate with the institute

- information about partner organizations, including names, contact information, nature of partnership

**Topics**: contains information regarding different educational topics and includes resources

- includes the name, skills, and resources available for specific topic

**Enumerators**: houses predefined lists or sets of values used throughout the database (the term 'enumerator' is commonly used to refer to such sets)

- includes lists of fixed values, like status codes, categories, or any standardized data used for consistency

### Standard Version Document

Database Schema Version Management

The migrate.js file found in ```./src/mongosh``` employs an automated script for managing and tracking the versions of our database schema. This script ensures that each collection in our database maintains a record of its schema version, facilitating easier upgrades and consistency across the database.

### Implementing Slug System for Unique Name Attributes

In our database, we use a 'slug' system for generating unique, URL-friendly names for various records. This approach enhances the usability and accessibility of our dta, especially when integrating with interfaces.

#### Implementing Slugs in the database

A slug is a short, URL-friendly representation of a string, typically used for attributes like names. Below are guidelines for implementing slugs in the database:

Name Attribute

- **Standard Attribute**: The `name` attribute is a standard attribute in the database schema.

- **Slug Usage**: While accepting any string value for a name, it's preferred to use slugs for automation purposes.

- **Slug Definition**: A slug is a short, spaceless representation of a string that facilitates automation.

Slug Pattern

- **Character Limit**: The slug should be limited to a certain number of characters, typically ranging between 32 to 64 characters.
- **Pattern Constraints**: The slug should consist of non-white-space characters only.

Example: People data

- **Name Attribute**: For the test data, `mentorhub-people-data.json`, the name attribute should be represented by `userName`.

- **Separate Properties**: To accommodate the first name and last name, it's recommended to have separate properties in addition to the `userName` slug. (firstName/lastName)

Implementation Considerations

- **Database Constraints**: Implement constraints in the database schema to enforce the slug pattern and character limit.

- **Validation**: Ensure proper validation mechanisms to handle slug creation and updates, adhering to the defined pattern and constraints.

Benefits of Using Slugs

- **Automation**: Slugs facilitate automation processes by providing standardized, machine-readable representations of attributes.

- **URL-Friendly**: Slugs are URL-friendly, making them suitable for use in web applications and APIs.

- **Consistency**: Using slugs promotes consistency in data representation and simplifies data processing tasks.

### Status Attribute

Status Attribute

- **Purpose**: The "Status" attribute is introduced to manage the state of entities within the database.

- **Soft Deletes**: Instead of physically deleting entities, they are marked with a "Status" of "Archived" to indicate they are no longer active but still retained for reference purposes.

Soft Delete Behavior

- **Archived Status**: Entities marked with an AArchived" status are considered soft-deleted

- **Retained Data**: Soft-deleted entities remain in the database but are excluded from regular queries to maintain data integrity.

- **Recovery**: Archived entities can be recovered or restored if needed, providing flexibility in data management.

### Enumerators and the Enumerators Collection

Enumerators

- **Definition**: Enumerators are a type of data structure used to define a set of named constants.

- **Purpose**: They are useful for representing fixed sets of related values, making code more readable and maintainable.

Enumerators Collection

- **Definition**: The Enumerators Collection is a centralized repository for all enumerators used within the project.

- **Purpose**: Provides a centralized location for defining and managing enumerators, promoting consistency across the codebase.

Usage Guidelines

- Refer to the appropriate enumerator within the collection when defining attributes or status values in the project.

- Ensure consistency in the usage of enumerators across the codebase to maintain clarity and readability.

### Test Data

- Test data is used to validate the functionality and performance of the software during testing.

- Running `./test.sh` will allow you to test the data files using `migrate.js` which performs several tasks related to MongoDB database management

### ObjectIDs

- **Definition**: ObjectIDs are unique identifiers assigned to objects within a database, particularly in MongoDB databases.

Importance in Testing

- Test data should include ObjectIDs to simulate realistic data scenarios and ensure data integrity during testing.

- **Database Operations**: ObjectIDs are used to perform database operations such as insertion, retrieval, updating, and deleting of documents

"_id" Field in Extended JSON Format

- When represented in Extended JSON format, the "_id" field is represented using the "$oid" syntax followed by the hexidecimal representation of the ObjectID value. Here is an example:

    `"_id": {
    "$oid": "bbbb00000000000000000000"
    }`

- When manipulating documents in MongoDB using Extended JSON, ensure the correct representation of the "_id" field using the "$oid" syntax.

### BreadCrumbs

- The "lastSaved" object in `mentorhub-people-schema.json` contains details such as the IP address, user UUID, timestamp, and correlation ID of the update transaction.

- This is associated with the last update of a person entity, such as who made the update, when it was made, and from where (IP address), along with the correlation ID for logging purposes.

## Build and run the Topic Scraper

The python topic scraper creates a topics JSON file by scraping EngineerKit Markdown files. This topics json file is used to load testing data into the topics collection.

```bash
cd ./src/topic-scraper
pip install -r requirements.txt
python scrape_engineerkit.py
```

### Testing changes locally

Use the following command: 
```bash
cd into src/mongosh
./test.sh
```
### Build and test the container

Use the following command to build and run the container locally. See [here for details](https://github.com/agile-learning-institute/mentorHub/blob/main/docker-configurations/README.md) on how to stop/start the database.

```bash
../src/docker/docker-build.sh
```

After that command completes successfully you can verify it worked successfully by

- checking the logs from your institute-mongosh container
- Connect to the database with the Mongo Compass and verify collections and data