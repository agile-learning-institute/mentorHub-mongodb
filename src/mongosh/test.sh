clear

# forcefully remove the testmongo database container
docker rm -f testmongo

# start the testmongo mongo database container
# --detach runs the container in the background
docker run -e MONGO_INITDB_ROOT_USERNAME=root -e MONGO_INITDB_ROOT_PASSWORD=example -p 27017:27017 --name testmongo --detach mongo:latest

# sleep to give the mongo container time to get started before the script is executed
sleep 5

# export the following environment variables for entrypoint.sh 
export HOST=localhost
export USER=root
export PASSWORD=example
export AUTH_DB=admin
export DB_NAME=agile-learning-institute
export LOAD_TEST=true

# execute the entrypoint script (also used by the container)
script_path="$(dirname "$(realpath "$0")")"
"$script_path/entrypoint.sh"
