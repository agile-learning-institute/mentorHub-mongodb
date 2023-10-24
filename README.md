# institute-data

This is project contains database configuration, migration scripts, and test data used by the institute system. The Dockerfile creates a mongosh container that connects to a database and runs the scripts to configure the database and load test data.

The docker compose starts the mongodb database container first, and when it is healthy it starts the mongosh container to run the configuration script.

[Here](https://github.com/orgs/agile-learning-institute/repositories?q=institute&type=all&sort=name) are all of the repositories in the [Institute](https://github.com/agile-learning-institute/institute/tree/main) system

## Prerequisits

- [Docker Desktop](https://www.docker.com/products/docker-desktop/)
- [Mongo Compass](https://www.mongodb.com/try/download/compass) - if you want a way to look into the database, the connection string will be

```html
mongodb://root:example@localhost:27017/?tls=false&directConnection=true
```

## Build the container

```bash
./docker-build.sh
```

## Run and Load the database container

```bash
docker compose up --detach
```

## Stop and Start the container without loosing data

```bash
docker compose stop
docker compose start
```

## Restart the container (reset data)

```bash
docker compose down
docker compose up --deatch
```

## Refactors and Enhancements

- [x] Create more complete test data
- [x] Implement Schema Validation
- [x] Implement Schema Version Migration
- [x] New Schema's and Collections [topics, resources]
- [ ] Abstract enumeration arrays so they can be used in schema and test data
- [ ] Implement minVersion with version + "T" if test data is loaded
- [ ] Implement Person transformation in load script (Version Upgrade from x.x.1T to x.x.2T)
- [ ] Breadcrumbs, define and include type in all schemas
- [ ] Improve URI schema pattern
