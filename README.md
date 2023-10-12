# institute-data

This is project contains database configuration and migration scripts, as well as test data and scripts to load it into the database. This database supports all the Mongo backing services in the institute system.

[here](https://github.com/orgs/agile-learning-institute/repositories?q=institute&type=all&sort=name) are all of the repositories in the [Institute](https://github.com/agile-learning-institute/institute/tree/main) system

## Prerequisits

- [Docker Desktop](https://www.docker.com/products/docker-desktop/)
- [Mongo Compass](https://www.mongodb.com/try/download/compass) - if you want a way to look into the database, the connection string will be

```html
mongodb://root:example@localhost:27017/?tls=false&directConnection=true
```

## Build the container

```bash
docker build . --tag institute-mongosh
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
- [ ] Implement Person transformation in load script
- [ ] Breadcrumbs
