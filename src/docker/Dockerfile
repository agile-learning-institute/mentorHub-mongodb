# From MongoDB Offical Image
FROM mongo:7.0.5

# Set the stage
WORKDIR /mongosh
ENV HOST=mentorhub-mongodb
ENV AUTH_DB=admin
ENV DB_NAME=agile-learning-institute
ENV LOAD_TEST=true
ENV USER=root
ENV PASSWORD=example

# Copy files in
COPY ./src/mongosh /mongosh
