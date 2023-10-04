# institute-person-db

This is a simple MongoDB that builds a container for development and testing use. Restarting the container resets data to a know starting state

[Here](https://github.com/orgs/agile-learning-institute/repositories?q=institute-person&type=all&sort=name) are the repositories in the person triplet

[here](https://github.com/orgs/agile-learning-institute/repositories?q=institute&type=all&sort=name) are all of the repositories in the [Institute](https://github.com/agile-learning-institute/institute/tree/main) system

## Prerequisits

- [Docker Desktop](https://www.docker.com/products/docker-desktop/)
- [Mongo Compass](https://www.mongodb.com/try/download/compass) - if you want a way to look into the database, the connection string will be 

```html
mongodb://root:example@localhost:27017/?tls=false&directConnection=true
```

## Build and run the container

```bash
docker build . --tag institute-person-db
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
