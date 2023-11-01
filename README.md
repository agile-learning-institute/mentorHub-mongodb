# institute-data

This is project contains database configuration, migration scripts, and test data used by the institute system. The Dockerfile creates a mongosh container that connects to a database and runs the scripts to configure the database and load test data.

The docker compose starts the mongodb database container first, and when it is healthy it starts the mongosh container to run the configuration script.

[Here](https://github.com/orgs/agile-learning-institute/repositories?q=institute&type=all&sort=name) are all of the repositories in the [Institute](https://github.com/agile-learning-institute/institute/tree/main) system

## Prerequisits

- [Docker Desktop](https://www.docker.com/products/docker-desktop/)
  - For Mac ```brew install docker```

### Optionally

- [Mongo Compass](https://www.mongodb.com/try/download/compass) - if you want a way to look into the database, the connection string will be

```html
mongodb://root:example@localhost:27017/?tls=false&directConnection=true
```

### Setup an environment variable for project navigation

Navigate to your institue-mongodb folder. Setup an environment variable to save this location. Use the environment variable to ensure you are in the proper pwd for each set of commands.

```bash
cd PATH_TO_REPO/institute-mongodb
ROOT=$PWD
echo $ROOT
```

## Run the database container(s) locally for API development

```bash
curl https://raw.githubusercontent.com/agile-learning-institute/institute-mongodb/main/src/docker/run-local-db.sh | /bin/bash
```

If you need to confirm that the script is secure, view $ROOT/src/docker/run-local-db.sh

## Build and run the Topic Scraper

The python topic scraper creates a topics JSON file by scraping EngineerKit Markdown files. This topics json file is used to laod testing data into the topics collection.

```bash
cd $ROOT/src/topic-scraper
pip install -r requirements.txt
python scrape_engineerkit.py
```

## Build the container locally

```bash
$ROOT/src/docker/docker-build.sh
```

## Run and Load the database container

```bash
cd $ROOT/src/docker
docker compose up --detach
```

## Stop and Start the container without loosing data

```bash
cd $ROOT/src/docker
docker compose stop
docker compose start
```

## Restart the container (reset data)

```bash
cd $ROOT/src/docker
docker compose down
docker compose up --deatch
```

## Refactors and Enhancements

- [x] Create more complete test data
- [x] Implement Schema Validation
- [x] Implement Schema Version Migration
- [x] New Schema's and Collections [topics, resources]
- [ ] Abstract enumeration arrays so they can be used in schema and test data
- [ ] Create Python script to scrape engineerkit markdown
- [ ] Implement minVersion with version + "T" if test data is loaded
- [ ] Implement Person transformation in load script (Version Upgrade from x.x.1T to x.x.2T)
- [ ] Breadcrumbs, define and include type in all schemas
- [ ] Improve URI schema pattern
