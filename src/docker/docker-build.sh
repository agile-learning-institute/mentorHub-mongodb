#!/bin/bash

# Build Docker Image
docker build --file src/docker/Dockerfile --tag ghcr.io/agile-learning-institute/mentorhub-mongosh:latest .
if [ $? -ne 0 ]; then
    echo "Docker build failed"
    exit 1
fi

# Run the Database, API, and UI containers
curl https://raw.githubusercontent.com/agile-learning-institute/mentorhub/main/docker-compose/run-local-db.sh | /bin/bash
