# From the official Mongo DockerHub image
FROM mongo:latest

# Copy schemas to /schemas
COPY ./schemas/* /schemas/

# Copy testDtaa to /testData
COPY ./testData/* /testData/

# Copy scripts to docker entrypoint folder
COPY ./src/* /docker-entrypoint-initdb.d/

# MongoDB will execute files with *.sh extension in /docker-entrypoint-initdb.d/ when the container starts
CMD ["mongod"]
