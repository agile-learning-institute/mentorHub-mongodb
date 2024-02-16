# From MongoDB Offical Image
FROM mongo:latest

# Set the stage
WORKDIR /mongosh
ENV HOST=mentorhub-mongodb
ENV AUTH_DB=admin
ENV DB_NAME=agile-learning-institute
ENV SCRIPT_PATH=/migrate.js
ENV LOAD_TEST=true

# Copy files in
COPY ./src/mongosh /mongosh
