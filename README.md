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



## Build and run the Topic Scraper

The python topic scraper creates a topics JSON file by scraping EngineerKit Markdown files. This topics json file is used to load testing data into the topics collection.
```

You may then run the script

```bash
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
cd into src/mongosh
../src/docker/docker-build.sh
```

After that command completes successfully you can verify it worked successfully by

- checking the logs from your institute-mongosh container
- Connect to the database with the Mongo Compass and verify collections and data



