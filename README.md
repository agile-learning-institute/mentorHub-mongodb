# mentorHub MongoDB

This repo builds a containerized utility that is used to configure the mongoDb database and load test data. 

We are using the [mongoSchemaManager](https://github.com/agile-learning-institute/mongoSchemaManager/blob/main/docs/REFERENCE.md) open source tool

When you use the ``mh up`` command to start a service that uses a mongoDB database, both the mongoDB container and this mentorhub-mongodb container are started so that the database is initialized with test data for your use.

## Prerequisites
- [Mentorhub Desktop Edition](https://github.com/agile-learning-institute/mentorHub/blob/main/mentorHub-developer-edition/README.md)

- For local access you can use the connection string ``mongodb://mongodb:27017/?replicaSet=rs0``if the mongodb host-name is defined in your /etc/hosts file. You can use the following command to make this change. 
```sh
echo '127.0.0.1 mongodb' | sudo tee -a /etc/hosts
```
### Optional
- [Mongo Compass](https://www.mongodb.com/try/download/compass) - if you want a way to look into the database. 


## Currently Deployed Schema documentation
View the [OpenApi specifications](https://agile-learning-institute.github.io/mentorHub-mongodb/) page for a list of the currently deployed collections, the currentVersion, and a sample openAPI schema specification for each.

## Collections
Here is a quick reference of the collections in the database
- Curriculum: A document used by an apprentice and mentor to manage a learning roadmap.
- Encounters: An encounter between a mentor and apprentice. 
- Partners: A partner or referral source for the institute.
- Paths: A path through learning topics (EngineerKit, Odin, etc.)
- People: A person associated with the institute
- Plans: A plan for a Encounter
- Ratings: Summarized ratings for resources
- Resources: A learning resource
- Skills: A skill that would be listed on a resume
- Topics: A categorized collection of skills and related resources

## Contributing
If you need to update a schema, or possibly enumerated list values, you should start by familiarizing yourself with the mongoSchemaManager reference, linked above. Once you are familiar with msmTypes and msmEnums you should be able to make changes in the ``configurations`` folders as needed.  Before creating a pull request, make sure you have tested your changes both locally and containerized. 

## Testing your configuration changes locally
```bash
make local
```
This will start the mongodb, and a mongoSchemaManager container, mounting the configurations folder into the container for processing. The stdout of this container is tailed until the process completes.

NOTE: This script will deploy the latest schema's into the /docs folder where they are published by GitHub Pages. You should **ALWAYS** use ``make local`` and ``make container`` to confirm successful execution before opening a pull request.

## Build and test the container 
```bash
make container
```
This will build your container locally, then start both the mongodb database, and your container. Your containers stdout will be tailed until processing completes. You should see the same output you saw with ``make local``. 

## Shut down services after testing
```bash
mh down
```
NOTE: This is only critical if you are testing non mentorHub configurations that use the default MongoDB port: 27017
