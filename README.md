# mentorHub MongoDB

This repo contains the mongoDb configurations that are deployed for the mentorHub platform. We are using the [mongoSchemaManager](https://github.com/agile-learning-institute/mongoSchemaManager/blob/main/docs/REFERENCE.md) open source tool to create a container that configures a MongoDB database by defining collections, schema validation, and loading test data. When you use the ``mh up`` command to start a service that uses a mongoDB database, both the mongoDB container and this msm container are started so that the database is initilized with test data for your use.

## Prerequisites
- [Mentorhub Desktop Edition](https://github.com/agile-learning-institute/mentorHub/blob/main/mentorHub-developer-edition/README.md)

## Currently Deployed Schema documentation
View [OpenApi specifications](https://github.com/agile-learning-institute/mentorhub-mongodb/) page for a list of the currently deployed collections, the currentVersion, and a sample openAPI schema specification for each.

## Testing your configuration changes locally
```bash
./msm test local
```
This will start the mongodb, and a mongoSchemaManager container, mounting the configurations folder into the container for processing. The stdout of this container is tailed until the process completes.

## Build and test the container 
```bash
./msm test container
```
This will build your container locally, then start both the mongodb database, and your container. Your containers stdout will be tailed until processing completes. You should see the same output you did with ``./msm test local``. 

NOTE: This script will deploy the latest schema's into the /docs folder where they are published by GitHub Pages. You should **ALWAYS** test your container before submiting a pull request.

## Shut down services after testing
```bash
mh down
```
NOTE: This is only critical if you are testing non mentorHub configurations that use the default MongoDB port: 27017
