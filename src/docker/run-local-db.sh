mkdir db
cd db
curl https://raw.githubusercontent.com/agile-learning-institute/institute-mongodb/main/src/docker/docker-compose.yaml > docker-compose.yaml
docker compose up --detach
cd ..
