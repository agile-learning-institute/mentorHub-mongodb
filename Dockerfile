# Parent Dockerfile https://github.com/docker-library/mongo/blob/982328582c74dd2f0a9c8c77b84006f291f974c3/3.0/Dockerfile
FROM mongo:latest

# Setup UserId/Password 
ENV MONGO_INITDB_ROOT_USERNAME=root
ENV MONGO_INITDB_ROOT_PASSWORD=example

# Modify child mongo to use /data/institute-person-data as dbpath (because /data/db wont persist the build)
RUN mkdir -p /data/institute-person-db \
    && echo "dbpath = /data/institute-person-db" > /etc/mongodb.conf \
    && chown -R mongodb:mongodb /data/institute-person-db

COPY ./institute-person-db.json /data/institute-person-db/

RUN mongod --fork --logpath /var/log/mongodb.log --dbpath /data/institute-person-db \
    && mongoimport --db agile-learning-institute --collection people --drop --file /data/institute-person-db/institute-person-db.json \
    && mongod --dbpath /data/institute-person-db --shutdown \
    && chown -R mongodb /data/institute-person-db

# Make the new dir a VOLUME to persists it 
VOLUME /data/institute-person-db

CMD ["mongod", "--config", "/etc/mongodb.conf"]
