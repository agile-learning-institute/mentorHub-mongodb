# mentorhub-mongodb

This project contains the data model for all collections in the mentorHub database, along with code and sample data to support testing and migration

To learn how to contribute, see [CONTRIBUTING.md](CONTRIBUTING.md)

For a list of all repositories in the [mentorHub](https://github.com/agile-learning-institute/mentorhub/tree/main) system, please click [here](https://github.com/orgs/agile-learning-institute/repositories?q=mentorHub-&type=all&sort=name)

## Layout

`src/docker` contains files relevant to building the `mentorhub-mongosh` docker image. This container is used to initialize a mongo database by defining the datatabase, creating collections, assigning schemas, and optionally loading test data.

`src/mongosh` contains the the scripts that initilize the database, along with the [MongoDB JSON Schema](https://www.mongodb.com/docs/manual/reference/operator/query/jsonSchema/#json-schema) definitions and test data for each collection. See [Contributing to mongosh](./CONTRIBUTING.mongosh.md) document for details on how to contribute to this work.

`src/topic-scraper` contains files to extract data for the topics collection from external sources. See the [Contributing to topic-scraper](./CONTRIBUTING.topic-scraper.md) document for details on how to contribute to this work.

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
```

You may then run the script

```bash
python scrape_engineerkit.py
```

This will create a JSON file containing the sample data for the topics collection.
