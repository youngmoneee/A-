FROM mongo

RUN mkdir -p /usr/mongo/db
WORKDIR /usr/mongo

COPY ./mongod.conf /usr/mongo/mongod.conf
CMD ["mongod", --config", "/etc/mongod.conf"]
