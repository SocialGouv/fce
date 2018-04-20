#!/bin/sh

/usr/bin/mongod --fork --config /etc/mongod.conf

exec "$@"
