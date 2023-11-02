# Build Docker image
docker build . --tag ghcr.io/agile-learning-institute/institute-mongosh:latest
if [ $? -ne 0 ]; then
    echo "Docker build failed"
    exit 1
fi

# Push Docker image
if [ $1 -eq '--push' ]; then
    docker push ghcr.io/agile-learning-institute/institute-mongosh:latest
    if [ $? -ne 0 ]; then
        echo "Docker Push failed"
        exit 1
    fi
    echo "image pushed"
fi
