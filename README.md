# mentorhub-mongodb

This project contains the data model for all collections in the mentorHub database, along with code and sample data to support testing and migration

To learn how to contribute, see [CONTRIBUTING.md](CONTRIBUTING.md)

For a list of all repositories in the [mentorHub](https://github.com/agile-learning-institute/mentorhub/tree/main) system, please click [here](https://github.com/orgs/agile-learning-institute/repositories?q=mentorHub-&type=all&sort=name)

## Layout

`src/docker` contains files relevant to building the `mentorhub-mongosh` docker image. Note that the database is initialized at runtime via a MongoDB Shell script `migrate.js`.

`src/mongosh` contains the [MongoDB JSON Schema](https://www.mongodb.com/docs/manual/reference/operator/query/jsonSchema/#json-schema) definitions and test data for each collection along with helper scripts to initialize or perform schema migration on the database

`src/topic-scraper` contains files to extract data for the topics collection from external sources

## Running the database

### Prerequisites

At minimum, you will need Docker and the MongoDB shell (`mongosh`) installed

- [Docker Desktop](https://www.docker.com/products/docker-desktop/)
- [Mongosh](https://www.mongodb.com/docs/mongodb-shell/install/)

#### Other resources

- [Mongo Compass](https://www.mongodb.com/try/download/compass) - for a graphical user interface to inspect the database

You will need to use the following connection string with Compass to access the database:

```
mongodb://root:example@localhost:27017/?tls=false&directConnection=true
```

## Running the Topic Scraper

### Prerequisites

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

This will create a JSON file containing the sample data for the topics collection
