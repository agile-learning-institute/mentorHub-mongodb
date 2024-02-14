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



