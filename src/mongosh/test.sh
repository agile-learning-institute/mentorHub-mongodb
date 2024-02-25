clear

# start the testmongo mongo database container
mh up mongoonly

# sleep to give the mongo container time to get started before the script is executed
sleep 5

# Set environment variable
export HOST=localhost
export AUTH_DB=admin
export DB_NAME=agile-learning-institute
export LOAD_TEST=true
export USER=root
export PASSWORD=example

# execute the entrypoint script (also used by the container)
./entrypoint.sh
