#!/bin/sh
set -e

dockerd-entrypoint.sh > /var/log/dockerd.log 2>&1 &

exec "$@"
