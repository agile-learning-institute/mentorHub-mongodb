# brings down any docker container located in the local directory; ensures that any existing container is removed
docker compose --project-directory ~/local --profile db down 
# forcefully removes any existing container named testmongo
docker rm -f testmongo
# starts a new docker container named testmongo with the following environment variables
# --detach runs the container in the background
docker run -e MONGO_INITDB_ROOT_USERNAME=root -e MONGO_INITDB_ROOT_PASSWORD=example -p 27017:27017 --name testmongo --detach mongo:latest

# export the following environment variables
export HOST=localhost
export USER=root
export PASSWORD=example
export AUTH_DB=admin
export DB_NAME=agile-learning-institute
export SCRIPT_PATH=migrate.js
export LOAD_TEST=true

#  sleep for 10 seconds; this is to ensure that the mongo container is up and running before the script is executed
sleep 3

# execute the following script
./entrypoint.sh

