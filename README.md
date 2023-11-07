# institute-data

This is project contains database configuration, migration scripts, and test data used by the institute system. The Dockerfile creates a mongosh container that connects to a database and runs the scripts to configure the database and load test data.

[Here](https://github.com/orgs/agile-learning-institute/repositories?q=institute&type=all&sort=name) are all of the repositories in the [Institute](https://github.com/agile-learning-institute/institute/tree/main) system

## Prerequisits

- [Docker Desktop](https://www.docker.com/products/docker-desktop/)

### Optionally

- [Python](https://www.python.org/downloads/) - if you want to run the Topic Scraper
- [Mongo Compass](https://www.mongodb.com/try/download/compass) - if you want a way to look into the database, the connection string will be

```html
mongodb://root:example@localhost:27017/?tls=false&directConnection=true
```

## Build and run the Topic Scraper

The python topic scraper creates a topics JSON file by scraping EngineerKit Markdown files. This topics json file is used to laod testing data into the topics collection.

```bash
cd ./src/topic-scraper
pip install -r requirements.txt
python scrape_engineerkit.py
```

### Manually build and test the container

Use the following comand to build and run the container locally. See [here for details](https://github.com/agile-learning-institute/institute/blob/main/docker-compose/README.md) on how to stop/start the database.

```bash
./src/docker/docker-build.sh
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
