#!/bin/bash
set -ex

start_date=$(date)
start_time=$(date +%s%N)

echo_exec_time() {
    a=$1
    b=$2
    diff=$((b-a))
    diff_sec=${diff:0: -9}

    echo "Execution time : ${diff_sec}s /// $((diff_sec / 60))m /// $((diff_sec / 3600))h"
}


echo "-----------------------------------------------------"
echo "START / Date: $start_date"
echo "-----------------------------------------------------"

# backup database
echo "----- START backup database -----"
start_backup_time=$(date +%s%N)

docker exec db bash -c "pg_dump -c --if-exists --no-acl -O -U postgres fce | grep -v -E 'DROP\ SCHEMA\ IF\ EXISTS\ public|CREATE\ SCHEMA\ public|COMMENT\ ON\ SCHEMA\ public'" | gzip > backup.sql.gz

end_backup_time=$(date +%s%N)
echo_exec_time "$start_backup_time" "$end_backup_time"

# download sirene files
echo "----- START download sirene files -----"
start_download_time=$(date +%s%N)

docker exec server ash -c "NODE_ENV=production node ./shell/run.js DownloadSirene"

end_download_time=$(date +%s%N)
echo_exec_time "$start_download_time" "$end_download_time"

# import sirene into database
echo "----- START import sirene into database -----"
start_import_time=$(date +%s%N)

docker exec server ash -c "NODE_ENV=production node ./shell/run.js ImportSirene --enterprises_filename StockUniteLegale_utf8.zip --establishments_filename StockEtablissement_utf8.zip"

end_import_time=$(date +%s%N)
echo_exec_time "$start_import_time" "$end_import_time"

# clean files
rm -f StockUniteLegale_utf8.zip
rm -f StockEtablissement_utf8.zip

# re-index
echo "----- START re-index -----"
start_reindex_time=$(date +%s%N)

docker exec server ash -c "rm -rf /tmp/data/data.json"
docker exec server ash -c "NODE_ENV=production node ./scripts/appsearchIndexer.js"
docker exec server ash -c "NODE_ENV=production node ./scripts/idx.js"

end_reindex_time=$(date +%s%N)
echo_exec_time "$start_reindex_time" "$end_reindex_time"

echo "----- FINISH -----"
echo_exec_time "$start_time" "$end_reindex_time"
