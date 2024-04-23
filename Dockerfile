# From MongoDB Offical Image
FROM ghcr.io/agile-learning-institute/msm:latest

# Default environment configuration values
# ENV CONNECTION_STRING=mongodb://root:example@localhost:27017
# ENV CONFIG_FOLDER=/opt/mongoSchemaManager/config
# ENV MSM_ROOT=/opt/mongoSchemaManager
# ENV LOAD_TEST_DATA=true
ENV DB_NAME=mentorHub

# Copy files 
COPY configurations /opt/mongoSchemaManager/configurations
