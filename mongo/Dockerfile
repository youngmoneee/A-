FROM mongo

RUN mkdir -p /usr/mongo/db
WORKDIR /usr/mongo

COPY ./mongod.conf /usr/mongo/mongod.conf
EXPOSE 27017
ENTRYPOINT ["/usr/bin/mongod", "--config", "/usr/mongo/mongod.conf"]
