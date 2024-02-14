# mentorhub-mongodb

This project contains the data model for all collections in the mentorHub database, along with code and sample data to support testing and migration.

- See [Contributing to Mongosh](./CONTRIBUTING.mongosh.md) for instructions on contributing to the mongosh container.
- See [Contributing to the Topic Scraper](./CONTRIBUTING.topic-scraper.md) for instructions on that automation.
- See [Database Standards](./STANDARDS.md) for information about our Mongodb standards.

## Layout

`src/docker` contains files relevant to building the `mentorhub-mongosh` docker image. This container is used to initialize a mongo database by defining the datatabase, creating collections, assigning schemas, and optionally loading test data.

`src/mongosh` contains the the scripts that initilize the database, along with the [MongoDB JSON Schema](https://www.mongodb.com/docs/manual/reference/operator/query/jsonSchema/#json-schema) definitions and test data for each collection. See [Contributing to mongosh](./CONTRIBUTING.mongosh.md) for details on how to contribute to this work.

`src/topic-scraper` contains files to extract data for the topics collection from external sources. See the [Contributing to topic-scraper](./CONTRIBUTING.topic-scraper.md) for details on how to contribute to this work.

## Running the database locally

### Mongo Prerequisites

- [Docker Desktop](https://www.docker.com/products/docker-desktop/)

### Starting the Database Container

See ["Run the MongoDB backing database"](https://github.com/agile-learning-institute/mentorHub/tree/main/docker-configurations#run-the-mongodb-backing-database) in the mentorHub repo for instructions on running the database container locally with test data.

### Other resources

- [Mongo Compass](https://www.mongodb.com/try/download/compass) - for a graphical user interface to inspect the database

You will need to use the following connection string with Compass to access the database:

```bash
mongodb://root:example@localhost:27017/?tls=false&directConnection=true
```

## Running the Topic Scraper

### Python Prerequisites

- [Python](https://www.python.org/downloads/) - to run the Topic scraper

### Execution

From the `src/topic-scraper` directory, install the dependencies as follows

```bash
pip install -r requirements.txt
python scrape_engineerkit.py
```

## Collections Standards

**People**: contains data related to the individuals associated with the institute

- individual profiles, roles or positions, and any other relevant personal details

**Partners**: represents entities or organizations that collaborate with the institute

- information about partner organizations, including names, contact information, nature of partnership

**Topics**: contains information regarding different educational topics and includes resources

- includes the name, skills, and resources available for specific topic

**Enumerators**: houses predefined lists or sets of values used throughout the database (the term 'enumerator' is commonly used to refer to such sets)

- includes lists of fixed values, like status codes, categories, or any standardized data used for consistency

## Standard Version Document

Database Schema Version Management

The migrate.js file found in ```./src/mongosh``` employs an automated script for managing and tracking the versions of our database schema. This script ensures that each collection in our database maintains a record of its schema version, facilitating easier upgrades and consistency across the database.

## Implementing Slug System for Unique Name Attributes

In our database, we use a 'slug' system for generating unique, URL-friendly names for various records. This approach enhances the usability and accessibility of our dta, especially when integrating with interfaces. 

### Implementing Slugs in the database

A slug is a short, URL-friendly representation of a string, typically used for attributes like names. Below are guidelines for implementing slugs in the database:

Name Attribute

- **Standard Attribute**: The `name` attribute is a standard attribute in the database schema.

- **Slug Usage**: While accepting any string value for a name, it's preferred to use slugs for automation purposes.

- **Slug Definition**: A slug is a short, spaceless representation of a string that facilitates automation.

Slug Pattern

- **Character Limit**: The slug should be limited to a certain number of characters, typically ranging between 32 to 64 characters.
- **Pattern Constraints**: The slug should consist of non-white-space characters only.

Example: People data

- **Name Attribute**: For the test data, `mentorhub-people-data.json`, the name attribute should be represent by `userName`.

- **Separate Properties**: To accommodate the first name and last name, it's recommended to have separate properties in additon to the `userName` slug. (firstName/lastName)

## Build and run the Topic Scraper

The python topic scraper creates a topics JSON file by scraping EngineerKit Markdown files. This topics json file is used to load testing data into the topics collection.
```

You may then run the script

```bash
python scrape_engineerkit.py
```

This will create a JSON file containing the sample data for the topics collection.
