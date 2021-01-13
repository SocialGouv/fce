#!/bin/bash
set -ex

# backup database
docker exec -it db bash -c "pg_dump -c --if-exists --no-acl -O -U postgres fce | grep -v -E 'DROP\ SCHEMA\ IF\ EXISTS\ public|CREATE\ SCHEMA\ public|COMMENT\ ON\ SCHEMA\ public'" | gzip > /home/factory/deployment/shared/backup.sql.gz

# import file
docker exec -it server ash -c "NODE_ENV=production node ./shell/run.js ImportCsv $1"
