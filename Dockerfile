# From a mongosh container
FROM rtsp/mongosh:latest

# Copy schemas to /schemas
COPY ./schemas/* /schemas/

# Copy testDtaa to /testData
COPY ./testData/* /testData/

# Copy scripts to docker entrypoint folder
COPY ./src/* /scripts/

# MongoDB will execute files with *.sh extension in /docker-entrypoint-initdb.d/ when the container starts
CMD ["/scripts/auto.sh"]
